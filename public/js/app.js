$(document).ready(function () {
    $(`#currentDate`).text(moment().format('L'));
    $(`.saved_article`).toggle();
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