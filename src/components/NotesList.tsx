import { useGetNotes } from "../hooks/useGetNotes";

export const NotesList = () => {
  const { notes, isLoading } = useGetNotes();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  console.log(notes);
  return (
    <div className="notesList">
      {notes.map((note) => (
        <div key={note.id}>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  );
};
