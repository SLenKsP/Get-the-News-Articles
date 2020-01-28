$(document).ready(function () {
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
            location.reload();
        })
    });
};

showArticlesOnPageLoad = () => {
    $.ajax({
        type: "GET",
        url: "/",
    }).then((res) => {});
};

saveArticle = () => {
    $(`.save_article`).click(function (e) {
        e.preventDefault();
        var article_id = $(this).attr("data_id");
        $.ajax({
            type: "POST",
            url: "/api/save/" + article_id,
        }).done((data) => {
            location.reload();
        })
    });
};

removeArticleFromSaved = () => {
    $(`.remove_from_save_article`).click(function (e) {
        e.preventDefault();
        var article_id = $(this).attr("data_id");
        // console.log(object);
        if ($(this).parent().children(`.this_article_notes`).children(`.note_card`).length === 0) {
            $.ajax({
                type: "POST",
                url: "/api/unsave/" + article_id,
            }).done((response) => {
                location.reload();
            });
        } else {
            $(this).next().text("Remove all associated notes first to remove this article from Saved!");
            $(`.remove_notes_notice`).show().delay(2000).fadeOut();
            console.log((`the text is ".${ $(this).parent().children(`.this_article_notes`).children(`.note_card`).length }"`));
        }
    });
};

addNoteToTheArticle = () => {
    $(`.save_new_note`).click(function (e) {
        e.preventDefault();
        var note_id = $(this).attr("data_id");
        var entered_title = $(`.note_title`).val();
        var entered_summary = $(`.note_summary`).val();
        if (entered_title === "" || entered_summary === "") {
            $(`.text_empty_notice`).text("Please fill title and note fields!").show().delay(1500).fadeOut();
        } else {
            var note_data = {
                note_title: entered_title,
                note_summary: entered_summary
            }
            $.ajax({
                type: "POST",
                url: "/api/articles/" + note_id,
                data: note_data,
                success: function (result) {
                    $(`.modal`).hide();
                },
            }).done((response) => {
                location.reload();
            });
        }
        $(`.note_title`).val("");
        $(`.note_summary`).val("");
    });
};

getNotesForArticle = () => {
    $(`.article_notes`).click(function (e) {
        e.preventDefault();
        var note_id = $(this).attr("note_id");
        $('.save_new_note').attr("data_id", note_id);
        $.ajax({
            method: "GET",
            url: "/articles/" + note_id
        }).then((response) => {});
    });
};

deleteNote = () => {
    $(".delete_note").click(function (e) {
        var id_of_note_to_be_delete = $(this).attr("note_id");
        e.preventDefault();
        $.ajax({
            type: "DELETE",
            url: "/api/note/" + id_of_note_to_be_delete,
            success: function () {
                $(this).parent().parent().remove();
            },
        }).done((res) => {
            $(`.note_delete_confirmation_text`).text("Note Deleted!").show().delay(1000).fadeOut();
            setTimeout(() => {
                location.reload();
            }, 1500);
        });
    });
};