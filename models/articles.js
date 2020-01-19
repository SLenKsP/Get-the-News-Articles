var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    article_title: {
        type: String,
        required: true
    },
    url_link: {
        type: String,
        required: true
    },
    article_summary: {
        type: String,
        required: true
    },
    article_img_src: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    article_notes: [{
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }],
    
});

var Articles = mongoose.model("Article", ArticleSchema);

module.exports = Articles;