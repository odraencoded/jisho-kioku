var recentKanji = undefined;
var kanjiResultsEl = document.querySelector("#radical_area > .results > .list");
var recentKanjiEl = document.createElement("div");
recentKanjiEl.id = "recent_kanji";

function attachRecentKanjiEl() {
	kanjiResultsEl.appendChild(recentKanjiEl);
}

attachRecentKanjiEl();

kanjiResultsEl.addEventListener("beforecopy", function(e) {
	// Stores a recently copied kanji
	var selection = window.getSelection().toString().trim();
	if(selection.length == 1) {
		// '<kanji>' > '9' > ' '
		if(selection > "9") {
			storeKanji(selection);
		}
	}
});

kanjiResultsEl.addEventListener("click", function(e) {
	// Stores a recently clicked kanji
	var el = e.toElement;
	if(el.tagName == "A") {
		storeKanji(el.textContent.trim());
	}
});

function storeKanji(kanji) {
	// Adds "kanji" to the start of the recentKanji string
	chrome.runtime.sendMessage({type: "new-recent-kanji", kanji: kanji});
}

function refreshRecentKanji() {
	// Creates the elements inside the extension's #recent_kanji div
	ajaxObserver.disconnect();
	
	recentKanjiEl.setAttribute("data-recent-kanji-count", recentKanji.length);
	
	// heading html
	html = '<span class="result_label recent_label">' + recentKanji.length + '</span>';
	// populate the kanji
	for(var i = 0; i < recentKanji.length; i++) {
		var kanjiOrd = recentKanji.charCodeAt(i);
		html += '<a href="/search/&#' + kanjiOrd + ';" class="result">&#' + kanjiOrd + ';</a>'; 
	}
	recentKanjiEl.innerHTML = html;
	
	// Remove the .recent_kanij class and add it again
	var recentFoundKanji = document.querySelectorAll(".recent_kanji");
	for(var i = 0; i < recentFoundKanji.length; i++) {
		recentFoundKanji[i].classList.remove("recent_kanji");
	}
	refreshFoundKanji();
	
	ajaxObserver.observe(kanjiResultsEl, {childList: true});
}

function refreshFoundKanji() {
	// Adds a .recent_kanji class to the anchors in
	// #found_kanji > #kanji_container created by jisho after the ajax query
	var foundKanji = kanjiResultsEl.querySelectorAll("a");
	for(var i = 0; i < foundKanji.length; i++) {
		var kanji = foundKanji[i];
		var value = recentKanji.indexOf(kanji.textContent.trim());
		if(value != -1) {
			kanji.classList.add("recent_kanji");
		}
	}
}

var ajaxObserver = new MutationObserver(function(mutations) {
	// If the change removed #recent_kanji from the DOM, reatacch it
	if(!recentKanjiEl.parentNode) {
		attachRecentKanjiEl();
	}
	
	refreshFoundKanji();
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
	// Refreshes the #recent_kanji div when the stored recent kanji changes
	if(areaName == "local" && changes.recentKanji) {
		recentKanji = changes.recentKanji.newValue || "";
		refreshRecentKanji();
	}
});

chrome.storage.local.get({recentKanji: ""}, function(data) {
	// if recentKanji is not undefined, it's already been
	// set by the chrome.storage.onChanged event handler
	if(recentKanji == undefined) {
		recentKanji = data.recentKanji;
		refreshRecentKanji();
	}
});