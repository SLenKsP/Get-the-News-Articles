var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var app = express();
var PORT = process.env.PORT || 3000;

// use express  
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// keep public folder static for usage
app.use(express.static("public"));

// Handlebars
app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set("view engine", "handlebars");

// connecting to Mongo db (local or cloud)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/news_articles_db";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
});
// routes
require(`./routes/apiroutes`)(app);
require(`./routes/htmlroutes`)(app);

// listening to port for localhost connection
app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT);
});