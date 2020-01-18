$(document).ready(function () {
    $(`#currentDate`).text(moment().format('L'));
    // renderNews();
});

renderNews = () => {
    var totalTitles = [1, 2, 3, 4, 5];
    totalTitles.map((num) => {
        var card = $(`<div class= "card">`);
        var card_image = $(`<img class="card-img-top" src="#" alt="test.img">`);
        var card_body = $(`<div class="card-body">`);
        var card_body_title = $(`<h4 class="card-title">`);
        var card_body_text = $(`<p class="card-text">`);
        var saveBtn = $(`<button type="button" class="btn btn-primary mr-2">`);
        var deleteBtn = $(`<button type="button" class="btn btn-danger">`);
        saveBtn.text(`Save The Article`);
        deleteBtn.text(`Delete The Article`);
        card_body_title.text("This is Title");
        card_body_text.text(`This is Body Text`);
        card_body.append(card_body_title, card_body_text, saveBtn, deleteBtn);
        card.append(card_image, card_body);
        $(`.articles`).append(card);
    });


}