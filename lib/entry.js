const $ = require('jquery');

document.addEventListener('DOMContentLoaded', () => {
  $('body').click(() => {
    $('ul').empty();
  })

  $(".checkbox").change(() => {
    $('ul').empty();
    sendRequest($(".search-box").val(), String($('.checkbox').prop('checked')));
  });

  $(".search-box").keyup(() => {
    // console.log($(".search-box").val());
    $('ul').empty();
    sendRequest($(".search-box").val(), String($('.checkbox').prop('checked')));
  });

  $(".search-box").click(() => {
    $('ul').empty();
    sendRequest($(".search-box").val(), String($('.checkbox').prop('checked')));
  })

});

function sendRequest(searchString, celebrity) {
  if (!/^\s+$/.test(searchString)) {
    $.ajax({
      url: "https://api.viki.io/v4/search.json?c=" + searchString +
      "&per_page=5&with_people=" + celebrity +
      "&app=100266a&t=" + $.now(),
      success: function(data) {fetchResults(data)}
    });
  }
}

function fetchResults(data) {
  console.log(data);
  for (d in data) {
    // const li = document.createElement('li');
    const link = "https://www.viki.com" + data[d].u.w;
    const li = $(`<li onclick="location.href='${link}'"></li>`)
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = data[d].i;
    div.textContent = data[d].tt;
    li.append(img);
    li.append(div);
    $("ul").append(li);
  }
}
