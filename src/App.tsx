import './App.css'
import { Editor } from './components/Editor'
import { NotesList } from './components/NotesList'

function App() {

  return (
    <>
      <h1>Notes app</h1>
      <NotesList />
      <Editor />
    </>
  )
}

export default App
