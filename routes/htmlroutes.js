const db = require(`../models`);

module.exports = app => {
    app.get(`/`, function (req, res) {

        var query = db.Articles.find({
            saved: false
        });
        query.exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render(`index`, {
                someArticles: result
            })
        })
    })
    app.get(`/saved`, function (req, res) {
        db.Articles.find({
            saved: true
        }).then(function (result) {
            console.log(result);
            res.render(`saved`, {
                savedArticles: result
            })
        })
    })
}