import './App.css'

import Sidebar from './components/Sidebar/Sidebar'
import Editor from './components/Editor/Editor'
import Assistant from './components/Assistant/Assistant'
import Terminal from './components/Terminal/Terminal'
import { useState } from 'react'

type OpenFile = {
  path: string
  name: string
  content: string
  isDirty: boolean

}

function App(): React.JSX.Element {
  const [openFile, setOpenFile] = useState<OpenFile | null>(null)

  const [openFiles, setOpenFiles] = useState<
    Record<string, OpenFile>
  >({})

  const handleSave = async (content: string) => {
  if (!openFile) return

  try {
    await window.api.writeFile(
      openFile.path,
      content
    )
  
    setOpenFile((previous) => {
      if (!previous) return previous
  
      const updatedFile = {
        ...previous,
        content,
        isDirty: false
      }
  
      setOpenFiles((files) => ({
        ...files,
        [previous.path]: updatedFile
      }))
  
      return updatedFile
    })
  } catch (error) {
    console.error('Failed to save file:', error)
  }
}

  const handleFileOpen = async (
    filePath: string,
    fileName: string
  ) => {
    const existingFile = openFiles[filePath]

    if (existingFile) {
      setOpenFile(existingFile)
      return
    }

    const content = await window.api.readFile(filePath)

    const file: OpenFile = {
      path: filePath,
      name: fileName,
      content,
      isDirty: false
    }

    setOpenFiles((previous) => ({
      ...previous,
      [filePath]: file
    }))

    setOpenFile(file)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">🍂 Autumn</div>
        <div className="status">● Ready</div>
      </header>

      <main className="workspace">
        <Sidebar onFileOpen={handleFileOpen} />

        <Editor
          fileName={openFile?.name ?? null}
          onSave={handleSave}
          isDirty={openFile?.isDirty ?? false}
          fileContent={openFile?.content ?? ''}
          onChange={(value) => {
            setOpenFile((previous) => {
              if (!previous) return previous

              const updatedFile = {
                ...previous,
                content: value,
                isDirty: true
              }

              setOpenFiles((files) => ({
                ...files,
                [previous.path]: updatedFile
              }))

              return updatedFile
            })
          }}
        />

        <Assistant />
      </main>

      <Terminal />
    </div>
  )
}

export default App