import './App.css'

import Sidebar from './components/Sidebar/Sidebar'
import Editor from './components/Editor/Editor'
import Assistant from './components/Assistant/Assistant'
import Terminal from './components/Terminal/Terminal'

function App(): React.JSX.Element {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">🍂 Autumn</div>
        <div className="status">● Ready</div>
      </header>

      <main className="workspace">
        <Sidebar />
        <Editor />
        <Assistant />
      </main>

      <Terminal />
    </div>
  )
}

export default App
