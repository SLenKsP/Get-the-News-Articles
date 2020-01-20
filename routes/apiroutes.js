const db = require(`../models`);
var axios = require("axios");
var cheerio = require("cheerio");
module.exports = app => {
    app.get(`/api/scrap`, function (req, res) {
        axios({
            method: "GET",
            url: `https://www.nytimes.com/section/us`,
        }).then(function (response) {
            var $ = cheerio.load(response.data);
            $(`.css-ye6x8s`).each(function (index, element) {
                // element == this
                var result = {};
                var title = $(this).children().children().children(`a`).children(`h2`).text();
                if (title !== "") {
                    result.article_title = title;
                };
                var link = $(this).children().children().children(`a`).attr(`href`);
                if (link !== undefined) {
                    result.url_link = link;
                }
                var summary = $(this).children().children().children(`a`).children(`p`).text();
                if (summary !== "") {
                    result.article_summary = summary;
                }
                var imgsrc = $(this).children().children().children(`a`).children(`div`).children(`figure`).children(`div`).children(`img`).attr(`src`);
                if (imgsrc !== undefined) {
                    result.article_img_src = imgsrc;
                }
                // result.title = $(this).children(`a`).children(`h2`).text();
                // result.link = $(this).children(`a`).attr(`href`);
                // result.summary = $(this).children(`a`).children(`p`).text();
                // result.imgsrc = $(this).children(`a`).children(`div`).children(`figure`).children(`div`).children(`img`).attr(`src`);

                // console.log(result);
                db.Articles.create(
                    result
                ).then((dbarticle) => {
                    console.log(dbarticle);
                    res.json(dbarticle)
                }).catch((err) => {
                    if (err) throw err
                    console.log(err);
                });
            });
            res.send(`scrap complete`)
        })
    });
    // save article in database
    app.post(`/api/save/:id`, function (req, res) {
        var id = req.params.id;
        db.Articles.findOneAndUpdate({
            _id: id
        }, {
            saved: true
        }).then(function (response) {
            res.json(response);
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    });

    // unsave article in database
    app.post(`/api/unsave/:id`, function (req, res) {
        var id = req.params.id;
        db.Articles.findOneAndUpdate({
            _id: id
        }, {
            saved: false
        }).then(function (response) {
            res.json(response);
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    });

    // create a note for article
    app.post(`/api/articles/:id`, function (req, res) {

        console.log(req.body.note_title);
        console.log(req.body.note_summary);
        db.Notes.create({
            note_title: req.body.note_title,
            note_summary: req.body.note_summary,
            article: req.params.id
        }).then(function (dbNote) {
            return db.Articles.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    article_notes: dbNote._id
                }
            }).then(function (response) {
                res.json(response);
            })
        }).catch(function (err) {
            if (err)
                res.json(err);
        })
    })
}