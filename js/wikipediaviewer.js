function enableInput() {
  $("#txtSearch").css("width", "280px");
  $("#txtSearch").removeAttr("placeholder");
  $("#instruction").html("Press ENTER to search");
}

function getArticle() {
  var baseAPI = 'https://en.wikipedia.org/w/api.php?action=query';
  var strSearch = $("#txtSearch").change().val().trim();
  if (strSearch === "") {
    alert('The search box is empty. There is nothing to search...');
    return;
  } else {
    $.ajax({
      url: baseAPI,
      dataType: 'jsonp',
      data: {
        'format': 'json',
        'prop': 'extracts',
        'generator': 'search',
        'exsentences': '2',
        'exlimit': '10',
        'exintro': '1',
        'explaintext': '1',
        'gsrsearch': strSearch,
      },
      success: function (wikiResult) {
        displayArticle(wikiResult);
      }
    });
  }
  $(".main").removeClass("align-vertical-center");
  $(".main").css("margin-top", "50px");
  $(".footer").removeClass("align-vertical-bottom");
  $("#instruction").html("Refresh to go back to main page");
}

function displayArticle(wikiResult) {
  var pageIDs = Object.keys(wikiResult.query.pages);
  pageIDs.forEach(function (pageID) {
    var articleTitle = wikiResult.query.pages[pageID].title;
    var articleDesc = wikiResult.query.pages[pageID].extract;
    var articleLink = 'https://en.wikipedia.org/?curid=' + pageID;
    var articleHTML = '<article>';
    articleHTML += '<a href="' + articleLink + '" target="_blank">';
    articleHTML += '<h1>' + articleTitle + '</h1>';
    articleHTML += '<p>' + articleDesc + '</p>';
    articleHTML += '</a>';
    articleHTML += '</article>';
    $(articleHTML).appendTo(".section-container");
  });
}

$(document).ready(function () {
  $("#txtSearch").css("width", "90px");
  $("#txtSearch").on("keydown", function (event) {
    if (event.which === 13) {
      $(".section-container").empty();
      getArticle();
    }
  });
});