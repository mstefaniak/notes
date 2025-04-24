import { Note } from "../types";

type Props = {
  notes: Note[];
  isLoading: boolean;
};

export const NotesList = ({ notes, isLoading }: Props) => {
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

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
