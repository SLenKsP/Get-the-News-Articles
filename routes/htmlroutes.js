const db = require(`../models`);

module.exports = app => {
    app.get(`/`, function (req, res) {

        var query = db.Articles.find({
            saved: false
        });
        query.exec(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.render(`index`, {
                someArticles: result
            })
        })
    })
    app.get(`/saved`, function (req, res) {
        db.Articles.find({
            saved: true
        }).then(function (result) {
            // console.log(result);
            res.render(`saved`, {
                savedArticles: result
            })
        })
    })
    //get notes for single article
    app.get(`/articles/:id`, function (req, res) {
        db.Articles.findOne({
            _id: req.params.id
        }).populate("Notes").then(function (dbArticle) {
            console.log(dbArticle.article_notes);
            // res.render("notes_for_saved_articles", {
            //     notes: dbArticle
            // });
            // res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        })
    })
}