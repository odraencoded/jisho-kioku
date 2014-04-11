var options = {
	recentKanjiCopy: true
}

var RECENT_KANJI_CAP = 20;
var recentKanji = undefined;
var recentKanjiIndexes = [];
var recentKanjiCount = 0;
var foundKanjiEl = document.getElementById("found_kanji");
var recentKanjiEl = document.createElement("div");
recentKanjiEl.id = "recent_kanji";
foundKanjiEl.appendChild(recentKanjiEl);

foundKanjiEl.addEventListener("beforecopy", function(e) {
	// Stores a recently copied kanji
	if(options.recentKanjiCopy) {
		var selection = window.getSelection().toString().trim();
		if(selection.length == 1) {
			// '<kanji>' > '9' > ' '
			if(selection > "9") {
				storeKanji(selection);
			}
		}
	}
});

foundKanjiEl.addEventListener("click", function(e) {
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

function getRecentKanjiClass(value) {
	if(value == 0) {
		return "most_recent";
	} else if(value < 5) {
		return "very_recent";
	} else if(value < 25) {
		return "kinda_recent";
	} else if(value < 60) {
		return "little_recent";
	} else {
		return "";
	}
}

function refreshRecentKanji() {
	// Creates the elements inside the extension's #recent_kanji div
	ajaxObserver.disconnect();
	
	// heading html
	html = '<h2>' + recentKanjiCount + ' recently used kanji</h2>';
	html += '<p class=\"clearfix\">';
	
	// populate the kanji
	for(var i = 0; i < recentKanjiIndexes.length; i++) {
		var index = recentKanjiIndexes[i];
		var kanjiOrd = recentKanji.charCodeAt(index);
		html += '<a href="/kanji/details/&#' + kanjiOrd + 
		        ';" class="result recent_kanji ' + getRecentKanjiClass(index) +
		        '">&#' + kanjiOrd + ';</a>'; 
	}
	html += '</p>';
	recentKanjiEl.innerHTML = html;
	
	ajaxObserver.observe(foundKanjiEl, {childList: true});
}

function refreshFoundKanji() {
	// Adds a .recent_kanji class to the anchors in
	// #found_kanji > #kanji_container created by jisho after the ajax query
	
	// Remove the .recent_kanjj class and add it again
	recentKanjiEl.innerHTML = "";
	var recentFoundKanji = document.querySelectorAll(".recent_kanji");
	for(var i = 0; i < recentFoundKanji.length; i++) {
		recentFoundKanji[i].classList.remove("recent_kanji");
	}
	
	recentKanjiIndexes = [];
	var foundKanji = document.querySelectorAll("#found_kanji a");
	for(var i = 0; i < foundKanji.length; i++) {
		var kanjiEl = foundKanji[i];
		var kanji = kanjiEl.textContent.trim();
		var value = recentKanji.indexOf(kanji);
		
		if(value != -1) {
			kanjiEl.classList.add("recent_kanji");
			var recentnessClass = getRecentKanjiClass(value);
			if(recentnessClass != "") {
				kanjiEl.classList.add(recentnessClass);
			}
			
			recentKanjiIndexes[recentKanjiIndexes.length] = value;
		}
	}
	
	console.debug(recentKanjiIndexes)
	if(foundKanji.length == 0) {
		// There are no found kanji, display unfiltered recent kanji
		recentKanjiCount = recentKanji.length;
		for(var i=0; i<Math.min(recentKanji.length, RECENT_KANJI_CAP); i++) {
			recentKanjiIndexes[recentKanjiIndexes.length] = i;
		}
	} else {
		// If there are found kanji they wouldn't have been added
		// from most recent to least recent order, this fixes that
		recentKanjiCount = recentKanjiIndexes.length;
		recentKanjiIndexes.sort(function(a, b) { return a - b; })
		.slice(0, RECENT_KANJI_CAP); // Apply cap
	}
	
	refreshRecentKanji();
}

var ajaxObserver = new MutationObserver(function(mutations) {
	// If the change removed #recent_kanji from the DOM, reatacch it
	if(!recentKanjiEl.parentNode) {
		foundKanjiEl.appendChild(recentKanjiEl);
	}
	
	refreshFoundKanji();
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
	// Refreshes the #recent_kanji div when the stored recent kanji changes
	if(areaName == "local") {
		if(changes.recentKanji) {
			recentKanji = changes.recentKanji.newValue || "";
			refreshFoundKanji();
		}
		
		for(var aKey in changes) {
			if(aKey in options) {
				newValue = changes[aKey].newValue;
				if(newValue != undefined)
					options[aKey] = newValue;
			}
		}
	}
});

(function() {
	var defaultData = {recentKanji: ""};
	for(var aKey in options)
		defaultData[aKey] = options[aKey];

	chrome.storage.local.get(defaultData, function(data) {
		// if recentKanji is not undefined, it's already been
		// set by the chrome.storage.onChanged event handler
		for(var aKey in options)
			options[aKey] = data[aKey];
		
		if(recentKanji == undefined) {
			recentKanji = data.recentKanji;
			refreshFoundKanji();
		}
	});
})();