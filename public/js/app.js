$(document).ready(function () {
    // $(`.savedNews`).hide();
    showArticlesOnPageLoad();
    $(`#currentDate`).text(moment().format('L'));
    $(`.saved_article`).toggle();
    saveArticle();
    scrapArticles();
    getNotesForArticle();
    addNoteToTheArticle();
    deleteNote();
    removeArticleFromSaved();

});
scrapArticles = () => {
    $(`#scrap_articles`).click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/api/scrap",
            success: showArticlesOnPageLoad()
        }).then((res) => {
            // console.log(res);
            location.reload();
        })
    });
}
// loadArticlesOnPageLoad = () => {
//     $.ajax({
//         type: "GET",
//         url: "/api/scrap",
//     }).then((res) => {
//         // console.log(res);
//         showArticlesOnPageLoad();
//     });
// }
showArticlesOnPageLoad = () => {
    $.ajax({
        type: "GET",
        url: "/",
    }).then((res) => {
        // console.log(res);
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
            console.log(data);

            location.reload();
        })
    });
}
deleteNote = () => {
    $(".delete_note").click(function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
}

removeArticleFromSaved = () => {
    $(`.remove_from_save_article`).click(function (e) {
        e.preventDefault();
        var article_id = $(this).attr("data_id");
        $.ajax({
            type: "POST",
            url: "/api/unsave/" + article_id,
        }).done((response) => {
            // console.log(response);
            location.reload();
        });
    });
}

addNoteToTheArticle = () => {
    $(`#save_new_note`).click(function (e) {
        e.preventDefault();
        var note_id = $(".article_notes").attr("note_id");
        console.log("note id is " + note_id);
        var entered_title = $(`.note_title`).val();
        console.log("note title is: " + entered_title);
        var entered_summary = $(`.note_summary`).val();
        console.log("note summary is: " + entered_summary);
        var note_data = {
            note_title: entered_title,
            note_summary: entered_summary
        }
        $.ajax({
            type: "POST",
            url: "/api/articles/" + note_id,
            data: note_data
        }).done((response) => {
            // console.log(response);
            // location.reload();
        })
        $(`.note_title`).val("");
        $(`.note_summary`).val("");
    });
}

getNotesForArticle = () => {
    $(`.article_notes`).click(function (e) {
        e.preventDefault();
        var note_id = $(this).attr("note_id");
        console.log(note_id);
        $.ajax({
            method: "GET",
            url: "/articles/" + note_id
        }).then((response) => {
            // console.log(response);
        });
    });
}