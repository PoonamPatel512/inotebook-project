import { useState , useContext } from "react";
import NoteContext from "./NoteContext";
import { AlertContext } from "../alert/AlertContext"

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, SetNotes] = useState(notesInitial);
  const { showAlert } = useContext(AlertContext)

  //fetch all notes
  const fetchNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    });
    const json = await response.json();
    // console.log(json)
    if (Array.isArray(json)) {
      SetNotes(json);
      showAlert("info", "welcome!!");
    } else {
      console.error("Expected array, got:", json);
    }
  }

  //add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    SetNotes(notes.concat(note));
    showAlert("success", "New Note Added successfully");
  };

  //delete a note
  const deleteNote = async (id) => {
    console.log("deleting a note" + id);
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

    });
    const json = await response.json();
    showAlert("info", "Note Deleted");
    // console.log(json)

    //logic in client
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    SetNotes(newnote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    showAlert("success", "Note Edited Successfully");
    // console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    SetNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
