const $ = require('jquery');

document.addEventListener('DOMContentLoaded', () => {

  $(".search-box").keyup((event) => {
    // console.log($(".search-box").val());
    $('li').remove();
    sendRequest($(".search-box").val());
  });





});

function sendRequest(searchString) {
  $.ajax({
    url: "https://api.viki.io/v4/search.json?c=" +
    searchString + "&per_page=5&with_people=true&app=100266a&t=" +
    $.now(),
    success: function(data) {fetchResults(data)}
  });
}

function fetchResults(data) {
  // console.log(data);
  for (d in data) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = data[d].i;
    li.textContent = data[d].tt;
    li.append(img);
    $(".search-results-ul").append(li);
  }

}
