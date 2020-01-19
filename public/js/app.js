$(document).ready(function () {
    // $(`.savedNews`).hide();
    showArticlesOnPageLoad();
    $(`#currentDate`).text(moment().format('L'));
    $(`.saved_article`).toggle();
    saveArticle();
    scrapArticles();
    deleteNote();

});
scrapArticles = () => {
    $(`#scrap_articles`).click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/",
            success: showArticlesOnPageLoad()
        }).then((res) => {
            console.log(res);
            window.location(`/`);
        })
    });
}
loadArticlesOnPageLoad = () => {
    $.ajax({
        type: "GET",
        url: "/api/scrap",
    }).then((res) => {
        console.log(res);
        // showArticlesOnPageLoad();
    });
}
showArticlesOnPageLoad = () => {
    $.ajax({
        type: "GET",
        url: "/",
    }).then((res) => {
        console.log(res);
    });
};

saveArticle = () => {
    $(`.save_article`).click(function (e) {
        e.preventDefault();
        var article_id = $(this).attr("data_id");
        console.log(article_id);
        $.ajax({
            type: "POST",
            url: "/api/save/" + article_id,
        }).done((data) => {
            window.location.reload();
        })
    });
}
deleteNote = () => {
    $(".delete_note").click(function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
}