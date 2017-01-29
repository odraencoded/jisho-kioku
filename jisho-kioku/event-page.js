var newRecentKanji = "";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "new-recent-kanji") {
            recordNewKanji(request, sender, sendResponse);
        } else if(request.type == 'new-query') {
            recordNewQuery(request, sender, sendResponse);
        } else if(request.type == 'new-bookmark') {
            recordNewBookmark(request, sender, sendResponse);
        } else if(request.type == 'delete-bookmark') {
            deleteBookmark(request, sender, sendResponse);
        }
    }
);

function recordNewKanji(request, sender, sendResponse) {
    // events run in async single-thread
    // so when we call the async chrome.storage.local.get later,
    // I'm not sure but maybe race condition can occur
    // just to be safe, if newRecentKanji.length > 1, then we're in a .get 
    // after one recordNewKanji but before that one's asunc .get
    // was able to call the callback, which means it's better
    // we don't do anything to preserve the newRecentKanji order.
    newRecentKanji = newRecentKanji.replace(request.kanji, "");
    newRecentKanji = request.kanji + newRecentKanji;
    if(newRecentKanji.length != 1) {
        return;
    }
    
    chrome.storage.local.get(
        { recentKanji: "", recentKanjiLimit: 600 }, function(data) {
            for(var i = 0; i < newRecentKanji.length; i++) {
                data.recentKanji = data.recentKanji.replace(newRecentKanji[i], "");
            }
            data.recentKanji = (newRecentKanji + data.recentKanji).substring(0, data.recentKanjiLimit);
            newRecentKanji = "";
            chrome.storage.local.set(data);
        }
    );
}

function recordNewQuery(request, sender, sendResponse) {
    chrome.storage.local.get(
        { recentQueries: [], recentQueryLimit: 200 }, function(data) {
            var i = data.recentQueries.indexOf(request.query);
            while(i !== -1) {
                data.recentQueries.splice(i, 1);
                i = data.recentQueries.indexOf(request.query);
            }
            
            data.recentQueries.splice(0, 0, request.query);
            if(data.recentQueries.length > data.recentQueryLimit) {
                var remainder = data.recentQueries.length - data.recentQueryLimit;
                data.recentQueries.splice(data.recentQueries.length - remainder, remainder)
            }
            
            chrome.storage.local.set(data);
        }
    );
}

// Bookmark keys is supposed to be lightweight to fetch which vocabs are bookmarked
// but since it's too hard to tell that in the jisho webpages it is not used.
function recordNewBookmark(request, sender, sendResponse) {
    chrome.storage.local.get(
        { bookmarks: {}, bookmarkKeys: {} }, function(data) {
            var bookmark = request.bookmark;
            var bookmarkKey = bookmark.vocab + '---' + bookmark.furigana.join('');
            
            data.bookmarks[bookmarkKey] = bookmark;
            data.bookmarkKeys[bookmarkKey] = true;
            
            chrome.storage.local.set(data);
        }
    );
}

function deleteBookmark(request, sender, sendResponse) {
    chrome.storage.local.get(
        { bookmarks: {}, bookmarkKeys: {} }, function(data) {
            delete data.bookmarks[request.bookmarkKey];
            delete data.bookmarkKeys[request.bookmarkKey];
            chrome.storage.local.set(data);
        }
    );
}
