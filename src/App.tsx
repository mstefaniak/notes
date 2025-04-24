import "./App.css";
import { Editor } from "./components/Editor";
import { NotesList } from "./components/NotesList";
import { useGetNotes } from "./hooks/useGetNotes";

function App() {
  const { notes, isLoading, refetch } = useGetNotes();
  const currentNote = notes[notes.length - 1];
  const handleNoteAdded = () => {
    refetch();
  };
  return (
    <>
      <h1>Notes app</h1>
      <NotesList notes={notes} isLoading={isLoading} />
      <Editor currentNote={currentNote} onNoteAdded={handleNoteAdded} />
    </>
  );
}

export default App;
