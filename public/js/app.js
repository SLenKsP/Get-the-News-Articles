$(document).ready(function () {
    $(`#currentDate`).text(moment().format('L'));
    $(`.saved_article`).toggle();
    scrapArticles();
    saveArticle();
    deleteNote();

});

deleteNote = () => {
    $(".delete_note").click(function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
}
saveArticle = () => {
    $(`.save_article`).click(function (e) {
        e.preventDefault();
        $(this).toggle();
        $(this).next().toggle();
    });
}

scrapArticles = () => {
    $(`#scrap_articles`).click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/api/scrap",
        }).then((res) => {
            console.log(res);
            // window.location(`/`);
        })
    });
}