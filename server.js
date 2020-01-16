var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;
var exphbs = require("express-handlebars");
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(express.static("public"));


// Handlebars
app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set("view engine", "handlebars");

// routes
require(`./routes/apiroutes`)(app);
require(`./routes/htmlroutes`)(app);

app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT);
})