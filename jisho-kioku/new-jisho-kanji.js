(function() {
    // Recent kanji setup
    var RECENT_KANJI_CAP = 20;
    var recentKanji = undefined;
    var recentKanjiIndexes = [];
    var recentKanjiCount = 0;
    var kanjiResultsEl = document.querySelector("#radical_area .results > .list");
    var kanjiShowLessLink = document.querySelector("#radical_area .results > .show_less.link");
    var recentKanjiEl = null;
    var ajaxObserver = null;
    
    InitKanjiKioku = function() {
        recentKanjiEl = document.createElement("div");
        recentKanjiEl.id = "recent_kanji";
        recentKanjiEl.className = "list showing_results";
        
        kanjiResultsEl.addEventListener("beforecopy", function(e) {
            // Stores a recently copied kanji
            if(options.recentKanjiCopy) {
                var selection = window.getSelection().toString().trim();
                if(selection.length == 1) {
                    // '<kanji>' > '9' > ' '
                    if(selection > "9") {
                        StoreKanjiData(selection);
                    }
                }
            }
        });

        addWebpageEnvironmentEvents();

        // Jisho.org doesn't reset their results when the reset_radicals button is clicked
        // since there's no gain in doing that, however, in this extension, the
        // gain is that we can show all the most recent kanji so we do that.
        document.querySelector('.reset_radicals').addEventListener('click', function() {
            refreshFoundKanji();
        });
        
        ajaxObserver = new MutationObserver(function(mutations) {
            // If the change removed #recent_kanji from the DOM, reattach it
            if(!recentKanjiEl.parentNode) {
                attachRecentKanjiEl();
            }
            
            refreshFoundKanji();
        });
    }
    
    function attachRecentKanjiEl() {
        kanjiResultsEl.parentNode.insertBefore(
            recentKanjiEl,
            kanjiShowLessLink.nextSibling
        )
    }

    function addWebpageEnvironmentEvents() {
        var scriptEl = document.createElement('script');
        scriptEl.text = (
            "(function() { webpageEnvironmentCodeInjection(); "
            + webpageEnvironmentCodeInjection.toString()
            + " })()"
        );
        document.body.appendChild(scriptEl);
        
        window.addEventListener("message", function(e) {
            if (event.data.type == "j-ex-character-chosen-in") {
                StoreKanjiData(e.data.character);
            }
        });
        
        function webpageEnvironmentCodeInjection() {
            var $kanjiResults = $("#radical_area .results > .list");
            
            window.addEventListener("message", function(e) {
                if (event.data.type == "j-ex-character-chosen-out") {
                    $kanjiResults.trigger("character_chosen", e.data.character);
                }
            });
            
            $kanjiResults.on("character_chosen", function(e, character) {
                window.postMessage({
                    type: "j-ex-character-chosen-in", character: character
                }, "*");
            });
        }
    }

    function sendKanjiChosen(character) {
        window.postMessage({
            type: "j-ex-character-chosen-out", character: character
        }, "*");
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
        
        recentKanjiEl.innerHTML = "";
        
        // heading html
        var headerEl = document.createElement("span");
        headerEl.className = "result_label recent_label";
        headerEl.textContent = recentKanjiCount;
        recentKanjiEl.appendChild(headerEl);
        
        // populate the kanji
        for(var i=0; i < recentKanjiIndexes.length; i++) {
            var index = recentKanjiIndexes[i];
            var kanji = recentKanji[index];
            
            var linkEl = document.createElement("a");
            linkEl.href = "/search/" + kanji;
            linkEl.className = "result recent_kanji " + getRecentKanjiClass(index);
            linkEl.textContent = kanji;
            
            linkEl.addEventListener("click", (function(kanji) {
                return function(e) {
                    e.preventDefault();
                    sendKanjiChosen(kanji);
                }
            })(kanji));
            
            recentKanjiEl.appendChild(linkEl);
        }
        
        ajaxObserver.observe(kanjiResultsEl, {childList: true});
    }

    function refreshFoundKanji() {
        // Adds a .recent_kanji class to the anchors in
        // #found_kanji > #kanji_container created by jisho after the ajax query
        
        // Remove the .recent_kanji from the kanji in the search results of jisho.
        recentKanjiEl.innerHTML = "";
        var recentFoundKanji = document.querySelectorAll(".recent_kanji");
        for(var i = 0; i < recentFoundKanji.length; i++) {
            recentFoundKanji[i].classList.remove("recent_kanji");
        }
        
        // Add the .recent_kanji kanji again
        recentKanjiIndexes = [];
        var foundKanji = kanjiResultsEl.querySelectorAll("a.result");
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
        
        var showRecentUnfiltered = false;
        if(foundKanji.length == 0) {
            showRecentUnfiltered = true;
        } else if(!document.querySelector('#radical_area .radical.selected')) {
            showRecentUnfiltered = true
        }
        
        if(showRecentUnfiltered) {
            // If there is no radical filter, show the recent kanji unfiltered.
            recentKanjiCount = recentKanji.length;
            recentKanjiIndexes = [];
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
    
    OnChangedKanjiData = function(changes) {
        if(changes.recentKanji) {
            recentKanji = changes.recentKanji.newValue || "";
            refreshFoundKanji();
        }
        
    }
    LoadDefaultKanjiData = function(data) {
        
        // if recentKanji is not undefined, it's already been
        // set by the chrome.storage.onChanged event handler
        if(recentKanji == undefined) {
            recentKanji = data.recentKanji;
            attachRecentKanjiEl();
            refreshFoundKanji();
        }
        
    }

})();
