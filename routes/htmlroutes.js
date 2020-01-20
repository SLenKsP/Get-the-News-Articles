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
        db.Notes.find({
            article: req.params.id
        }).then(function (response) {
            console.log(response);
            // res.json({
            //     response
            // });

            res.render("saved", {
                article_notes: response
            })
        }).catch(function (err) {
            console.log(err);
            res.json(err);
        })
    })
}