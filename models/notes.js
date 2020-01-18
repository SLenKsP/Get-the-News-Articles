var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NotesPerArticle = new Schema({

});

var Notes = mongoose.model("Notes", NotesPerArticle);

module.exports = Notes;