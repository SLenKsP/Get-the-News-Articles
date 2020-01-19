const db = require(`../models`);
var axios = require("axios");
var cheerio = require("cheerio");
module.exports = app => {
    app.get(`/api/scrap/`, (req, res) => {
        axios({
            method: "GET",
            url: `https://www.nytimes.com/section/us`,
            limit: 3
        }).then((response) => {
            var $ = cheerio.load(response.data);
            $(`.css-ye6x8s`).each(function (index, element) {
                // element == this
                var result = {};
                    var title = $(this).children().children().children(`a`).children(`h2`).text();
                    if (title !== "") {
                        result.title = title;
                    };
                    var link = $(this).children().children().children(`a`).attr(`href`);
                    if (link !== undefined) {
                        result.link = link;
                    }
                    var summary = $(this).children().children().children(`a`).children(`p`).text();
                    if (summary !== "") {
                        result.summary = summary;
                    }
                    var imgsrc = $(this).children().children().children(`a`).children(`div`).children(`figure`).children(`div`).children(`img`).attr(`src`);
                    if (imgsrc !== undefined) {
                        result.imgsrc = imgsrc;
                    }
                    // result.title = $(this).children(`a`).children(`h2`).text();
                    // result.link = $(this).children(`a`).attr(`href`);
                    // result.summary = $(this).children(`a`).children(`p`).text();
                    // result.imgsrc = $(this).children(`a`).children(`div`).children(`figure`).children(`div`).children(`img`).attr(`src`);
                
                console.log(result);
                db.Articles.create({
                    article_title: result.title,
                    url_link: result.link,
                    article_summary: result.summary,
                    article_img_src: result.src
                }).then((dbarticle) => {
                    console.log(dbarticle);
                    // res.redirect(`/`);
                }).catch((err) => {
                    console.log(err);
                });
            });
        })
    });
}