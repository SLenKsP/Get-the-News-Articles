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
};

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

removeArticleFromSaved = () => {
    $(`.remove_from_save_article`).click(function (e) {
        e.preventDefault();
        var article_id = $(this).attr("data_id");
        if ($(`.this_article_notes`).children(`note_card`).length <0) {

            $.ajax({
                type: "POST",
                url: "/api/unsave/" + article_id,
            }).done((response) => {
                // console.log(response);
                location.reload();
            });
        } else {
            $(`.remove_notes_notice`).text("Remove all associated notes first to remove this article from Saved!");
            $(`.remove_notes_notice`).show().delay(2000).fadeOut();
            console.log((`the text is ".${$(`.this_article_notes`).children(`note_card`).length}"`));
        }

    });
}

addNoteToTheArticle = () => {
    $(`.save_new_note`).click(function (e) {
        e.preventDefault();
        // var note_id = $(".article_notes").attr("note_id");
        var note_id = $(this).attr("data_id");
        console.log("note id is " + note_id);
        var entered_title = $(`.note_title`).val();
        console.log("note title is: " + entered_title);
        var entered_summary = $(`.note_summary`).val();
        console.log("note summary is: " + entered_summary);
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
                // console.log(response);
                location.reload();
            });
        }
        $(`.note_title`).val("");
        $(`.note_summary`).val("");
    });
}

getNotesForArticle = () => {
    $(`.article_notes`).click(function (e) {
        e.preventDefault();
        var note_id = $(this).attr("note_id");
        $('.save_new_note').attr("data_id", note_id);
        console.log("save new note has id: " + note_id);
        console.log(note_id);
        $.ajax({
            method: "GET",
            url: "/articles/" + note_id
        }).then((response) => {
            // console.log(response);

        });
    });
}
deleteNote = () => {
    $(".delete_note").click(function (e) {
        var id_of_note_to_be_delete = $(this).attr("note_id");
        console.log(`Deleting note id ${id_of_note_to_be_delete}`);
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
}
