const db = require(`../models`);

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

                console.log(result);
                db.Articles.create(
                    result
                ).then((dbarticle) => {
                    console.log(dbarticle);
                    // res.redirect(`/`);
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
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    });
}