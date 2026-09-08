import { useState } from 'react'

type SidebarProps = {
  onFileOpen: (filePath: string, fileName: string) => void
}


function Sidebar({ onFileOpen }: SidebarProps): React.JSX.Element {
  type FileEntry = {
  name: string
  isDirectory: boolean
  path: string
}
  const [folderPath, setFolderPath] = useState<string | null>(null)

  const [files, setFiles] = useState<FileEntry[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
  new Set()
)

const [folderContents, setFolderContents] = useState<
  Map<string, FileEntry[]>
>(new Map())

const toggleFolder = async (folder: FileEntry) => {
  if (!folder.isDirectory) return

  const isExpanded = expandedFolders.has(folder.path)

  if (isExpanded) {
    setExpandedFolders((previous) => {
      const next = new Set(previous)
      next.delete(folder.path)
      return next
    })

    return
  }

  if (!folderContents.has(folder.path)) {
    const children = await window.api.readFolder(folder.path)

    setFolderContents((previous) => {
      const next = new Map(previous)
      next.set(folder.path, children)
      return next
    })
  }

  setExpandedFolders((previous) => {
    const next = new Set(previous)
    next.add(folder.path)
    return next
  })
}

const renderFiles = (entries: FileEntry[], depth = 0) => {
  return entries.map((file) => {
    const isExpanded = expandedFolders.has(file.path)

    return (
      <div key={file.path}>
        <div
          className="file"
          style={{ paddingLeft: `${14 + depth * 16}px` }}
          onClick={() => {
  if (file.isDirectory) {
    toggleFolder(file)
  } else {
    onFileOpen(file.path, file.name)
  }
}}
        >
          {file.isDirectory
            ? isExpanded
              ? '📂'
              : '📁'
            : '📄'}{' '}
          {file.name}
        </div>

        {file.isDirectory &&
          isExpanded &&
          folderContents.has(file.path) &&
          renderFiles(folderContents.get(file.path)!, depth + 1)}
      </div>
    )
  })
}

  return (
    <aside className="sidebar">

  <div className="panel-title">
    EXPLORER
  </div>

  <button
    onClick={async () => {
      const folder = await window.api.openFolder()

      if (folder) {
        setFolderPath(folder)

        const files = await window.api.readFolder(folder)

        setFiles(files)
      }
    }}
  >
    Open Folder
  </button>

  <div className="file-list">

    {folderPath && (
      <div className="folder-name">
        {folderPath}
      </div>
    )}

    <div className="file-list">

  {folderPath && (
    <div className="folder-name">
      {folderPath}
    </div>
  )}

  {renderFiles(files)}

</div>

  </div>

</aside>
  )
}

export default Sidebar