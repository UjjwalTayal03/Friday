import '../../monaco'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

type EditorProps = {
  fileName: string | null
  fileContent: string
  onChange: (value: string) => void
  onSave: (content: string) => void
}

function getLanguage(fileName: string | null): string {
  if (!fileName) return 'plaintext'

  if (fileName.endsWith('.ts')) return 'typescript'
  if (fileName.endsWith('.tsx')) return 'typescript'
  if (fileName.endsWith('.js')) return 'javascript'
  if (fileName.endsWith('.jsx')) return 'javascript'
  if (fileName.endsWith('.json')) return 'json'
  if (fileName.endsWith('.css')) return 'css'
  if (fileName.endsWith('.html')) return 'html'
  if (fileName.endsWith('.md')) return 'markdown'

  return 'plaintext'
}

function CodeEditor({
  fileName,
  fileContent,
  onChange,
  onSave
}: EditorProps): React.JSX.Element {
  return (
    <section className="editor">
      <div className="panel-title">
        EDITOR
      </div>
      <button onClick={() => onSave(fileContent)}>
  Save
</button>

      <div className="editor-content">

        
        {!fileName ? (
          <div className="empty-editor">
            Open a file to start editing
          </div>
        ) : (
          <Editor
  height="100%"
  language={getLanguage(fileName)}
  value={fileContent}
  onChange={(value) => {
    onChange(value ?? '')
  }}
  onMount={(editor) => {
  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
    () => {
      const currentContent = editor.getValue()

      onSave(currentContent)
    }
  )
}}
  theme="vs-dark"
  options={{
    minimap: {
      enabled: false
    },
    fontSize: 14,
    padding: {
      top: 16
    }
  }}
/>
        )}
      </div>
    </section>
  )
}

export default CodeEditor