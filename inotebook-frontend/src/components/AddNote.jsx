import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note , setNote] = useState({title: "" , description: "" , tag: ""})

  const handleSubmit = (e) =>{
      e.preventDefault();
      addNote(note.title , note.description , note.tag);
      setNote({title: "" , description: "" , tag: ""})
  }

  const onChange = (e) =>{
    setNote({...note , [e.target.name] : e.target.value})
  }
  return (
    <div>
      <form>
        <div className="form-group my-2">
          <label className="my-2" htmlFor="title">title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Enter title" onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label className="my-2" htmlFor="description">description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="description" onChange={onChange}/>
        </div>
        <div className="form-group my-2">
          <label className="my-2" htmlFor="tag">tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="tag" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary my-2" disabled={note.title.length < 5 || note.description.length <5} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote;
