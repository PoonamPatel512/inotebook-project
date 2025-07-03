import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./addNote";
import { useNavigate } from "react-router-dom";


function Notes() {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, fetchNote , editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNote()
    }
    else{
      navigate("/login");
    }
  }, [])

  const [note, setNote] = useState({id:"" , etitle: "", edescription: "", etag: "" })
  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id : currentNote._id , etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag })
  }

  const handleSubmit = (e) => {
    
    // console.log("updating note ",note)
    editNote(note.id , note.etitle, note.edescription, note.etag )
    refClose.current.click()    
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="form-group my-2">
                    <label className="my-2" htmlFor="etitle">etitle</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} placeholder="Enter etitle" onChange={onChange}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className="my-2" htmlFor="edescription">edescription</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="edescription" onChange={onChange} />
                  </div>
                  <div className="form-group my-2">
                    <label className="my-2" htmlFor="etag">etag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="etag" onChange={onChange} />
                  </div>

                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length <5} onClick={handleSubmit} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>your Notes</h2>

        {notes.length === 0 && <p>No notes to display</p>}

        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  );
}

export default Notes;
