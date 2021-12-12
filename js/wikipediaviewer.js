function getArticle(txtSearch) {
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php?action=query',
		dataType: 'jsonp',
		crossDomain: true,
		data: {
			'format': 'json',
			'prop': 'extracts',
			'generator': 'search',
			'exsentences': '2',
			'exlimit': '10',
			'exintro': '1',
			'explaintext': '1',
			'gsrsearch': txtSearch
		},
		success: wikiResult => getArticleDetails(wikiResult)
	});
}

function getArticleDetails(wikiResult) {
	let wikiPages = wikiResult.query.pages;
	let pageIDs = Object.keys(wikiPages);

	pageIDs.forEach(pageID => {
		let articleTitle = wikiPages[pageID].title;
		let articleDesc = wikiPages[pageID].extract;
		let articleLink = `https://en.wikipedia.org/?curid=${pageID}`;

		renderArticle(articleTitle, articleDesc, articleLink);
	});
}

function renderArticle(articleTitle, articleDesc, articleLink) {
	let articleHTML = 
		`<div class="card article-item">
			<a href="${articleLink}" target="_blank">
				<h2 class="card-header">${articleTitle}</h2>
				<div class="card-body">
					<p class="card-text">${articleDesc}</p>
				</div>
			</a>
		</div>`;

	showArticle(articleHTML);
}

function showArticle(articleHTML) {
	$(".articles-container").append(articleHTML);
}

$(document).ready(function () {
	$("#searchbox").on("click", function() {
		$(this).removeAttr("placeholder");
	});

	$("#searchbox").on("keydown", function(keyCode) {
		let txtSearch = $(this).change().val().trim();
		
		if (txtSearch === "") {
			$(this).attr({"placeholder": "Search Wikipedia for articles..."});
		}		
		
		if (keyCode.which === 13) {
			$(".articles-container").empty();
			txtSearch !== "" ? getArticle(txtSearch) : alert("Search box is empty...");
		}
	});
	
});