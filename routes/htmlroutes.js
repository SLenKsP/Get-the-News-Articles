const db = require(`../models`);
var someArticles = [{
        imgUrl: "#1",
        imgAltText: "1.img",
        articleTitle: "title 1",
        articleText: "text 1"
    },
    {
        imgUrl: "#2",
        imgAltText: "2.img",
        articleTitle: "title 2",
        articleText: "text 2"
    },
    {
        imgUrl: "#3",
        imgAltText: "3.img",
        articleTitle: "title 3",
        articleText: "text 3"
    }
];
var testNotes = [{
        notedTime: "notedTime 1",
        note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, similique in aliquid laudantium rerum tenetur excepturi corrupti quidem minima possimus eius. Quibusdam adipisci doloremque maiores voluptas, totam exercitationem cupiditate perferendis."
    },
    {
        notedTime: "notedTime 2",
        note: "note 2"
    },
    {
        notedTime: "notedTime 3",
        note: "note 3"
    }
]
module.exports = app => {
    // app.get(`/`, (req, res) => {
    //     res.render(`index`);
    // })
    app.get(`/`, (req, res) => {
        // var articlesData = {
        //     someArticles: [],
        //     notes: []
        // }
        // someArticles.map((item) => {
        //     articlesData.someArticles.push(item);
        // });
        // testNotes.map((item) => {
        //     articlesData.notes.push(item);
        // });
        // console.log(articlesData);
        // res.render(`index`, articlesData);
        db.Articles.find({}, (err, result) => {
            if (err) throw err;
            res.render(`index`, {
                articlesData: result
            });
        });
    })
}