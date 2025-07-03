const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: fetch all notes using GET "/api/auth/fetchallnotes"  login require.-will use fetchuser middleware
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("Internal server error");
  }
});

// ROUTE 2: add note using POST "/api/auth/addnote"  login require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title should have more than 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "description should have more than 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //if error send error with bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.message });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.send(500).send("Internal server error");
    }
  }
);

// ROUTE 3: update existing note using PUT "/api/auth/updatenote/:id"  login require
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create nwe note object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find note to update and update it
    let note = await Notes.findById(req.params.id); //param.id mtlb updatenote/:id vadi id
    if (!note) return res.status(401).send("Not Allowed!"); //if give id's note is not found

    //to do that user can only updade its own note
    if (note.user.toString() !== req.user.id) {
      // note mtlb hal uper const banai e ena user in id e apda given mtlb je access kare che e user ni id brbr nathi to mtlb ke user potani j note access nai kari rahyo
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    ); //new true means agar new content aye to woh create ho jaye
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.send(500).send("Internal server error");
  }
});

// ROUTE 4: delete existing note using DELETE "/api/auth/deletenote/:id"  login require
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      const { title, description, tag } = req.body;
       
      //find note to delete and delete it
      let note = await Notes.findById(req.params.id); //param.id mtlb updatenote/:id vadi id
      if (!note) return res.status(401).send("Not Allowed!"); //if give id's note is not found
  
      //to do that user can only delete its own note
      if (note.user.toString() !== req.user.id) {
        // note mtlb hal uper const banai e ena user in id e apda given mtlb je access kare che e user ni id brbr nathi to mtlb ke user potani j note access nai kari rahyo
        return res.status(401).send("Not Allowed!");
      }
  
      note = await Notes.findByIdAndDelete(req.params.id,); 
      return res.status(200).json({"sucess":"note has been deleted",note:note})

    } catch (error) {
      console.error(error.message);
      res.send(500).send("Internal server error");
    }
  });
  

module.exports = router;
