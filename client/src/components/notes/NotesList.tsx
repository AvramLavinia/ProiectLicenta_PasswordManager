import Note from "./Note";
import AddNote from "./AddNote";
import { NoticeState } from "../../logic/redux/slices/notices.slice";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
}: {
  notes: NoticeState[];
  handleAddNote: (text: string) => void;
  handleDeleteNote: (id: string) => void;
}) => {
  return (
    <div className="notes-list">
      {notes.map((note: NoticeState) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.description}
          date={note.createAt}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};
export default NotesList;
