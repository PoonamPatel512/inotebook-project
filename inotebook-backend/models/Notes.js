const mongoose = require("mongoose");
const { Schema } = mongoose;

const Notesschema = new Schema({
  user: {
    //bcz we need to link notes to user. kaya user ni notes 6 em.
    type: mongoose.Schema.Types.ObjectId, //foreign key jevu
    ref: "user" //ref from user model
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "general"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Notes = mongoose.model("notes", Notesschema);
module.exports = Notes
