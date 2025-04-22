import { useGetNotes } from "../hooks/useGetNotes"

export const NotesList = () => {
  const { notes, isLoading } = useGetNotes()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>
    {notes.map((note) => (
      <div key={note.id}>
        <div>{note.body}</div>
      </div>
    ))}
  </div>
}