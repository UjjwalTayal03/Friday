import './App.css'

import Sidebar from './components/Sidebar/Sidebar'
import Editor from './components/Editor/Editor'
import Assistant from './components/Assistant/Assistant'
import Terminal from './components/Terminal/Terminal'
import { useState } from 'react'

function App(): React.JSX.Element {
  const [openFile, setOpenFile] = useState<string | null>(null)
const [fileContent, setFileContent] = useState('')

const handleFileOpen = async (
  filePath: string,
  fileName: string
) => {
  const content = await window.api.readFile(filePath)

  setOpenFile(fileName)
  setFileContent(content)
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
  fileName={openFile}
  fileContent={fileContent}
/>
        <Assistant />
      </main>

      <Terminal />
    </div>
  )
}

export default App
