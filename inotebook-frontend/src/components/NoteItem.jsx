import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const {  updateNote} = props;

  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 shadow-sm" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            <i class="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
