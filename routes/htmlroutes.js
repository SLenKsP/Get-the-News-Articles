const db = require(`../models`);

module.exports = app => {
    // Get main page that displays scrapped articles
    app.get(`/`, function (req, res) {

        var query = db.Articles.find({
            saved: false
        });
        query.exec(function (err, result) {
            if (err) throw err;
            res.render(`index`, {
                someArticles: result
            })
        })
    })
    // get saved articles along with notes if any
    app.get(`/saved`, function (req, res) {
        db.Articles.find({
            saved: true
        }).populate("article_notes").then(function (result) {
            res.render(`saved`, {
                savedArticles: result
            });
        });
    })
    //get notes for single article
    app.get(`/articles/:id`, function (req, res) {
        db.Notes.find({
            article: req.params.id
        }).then(function (response) {
            res.render("saved", {
                article_notes: response
            })
        }).catch(function (err) {
            res.json(err);
        })
    })
}