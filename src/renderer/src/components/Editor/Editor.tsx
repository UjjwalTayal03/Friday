import '../../monaco'
import Editor from '@monaco-editor/react'

function CodeEditor(): React.JSX.Element {
  return (
    <section className="editor">
      <div className="panel-title">EDITOR</div>

      <div className="editor-content">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultValue={`function greet(name: string) {
  return \`Hello \${name}\`;
}`}
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
      </div>
    </section>
  )
}

export default CodeEditor
