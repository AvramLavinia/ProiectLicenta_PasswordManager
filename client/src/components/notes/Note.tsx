import { MdDeleteForever } from "react-icons/md";

const Note = ({
  id,
  text,
  date,
  handleDeleteNote,
}: {
  id: string;
  text: string;
  date: string;
  handleDeleteNote: (id: string) => void;
}) => {
  const formatDate = new Date(date);

  let day = formatDate.getDate();
  let month = formatDate.getMonth();
  let year = formatDate.getFullYear();

  const formated = day + "/" + month + "/" + year;

  return (
    <div className="note">
      <textarea
        defaultValue={text}
        className="textAreaNotice"
        color="white"
        rows={11}
        style={{ textOverflow: "clip" }}
        disabled={true}
      />
      <div className="note-footer">
        <small>{formated}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
