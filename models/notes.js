var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NotesPerArticle = new Schema({
    note_title: {
        type: String, 
        required: true
    }, 
    note_summary: {
        type: String, 
        required: true
    }
});

var Notes = mongoose.model("Notes", NotesPerArticle);

module.exports = Notes;