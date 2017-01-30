// This file contains persistence methods used by other scripts.
// It provides a layer of abstraction over Chrome's event page and storage.
//
// In theory, to port the extension to Firefox, for example, you only need to
// somehow replace the functionality described here and in the event page.
//
// I only use Chrome lately so I can't be bothered to do that. Sorry.


function GetDefaultData(defaults, callback) {
    chrome.storage.local.get(defaults, callback);
}
function SaveOptionsData(options) {
    chrome.storage.local.set(options);
}

function AddOnDataChangedListener(callback) {
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        if(areaName == "local") {
            callback(changes);
        }
    });
}

function StoreKanjiData(kanji) {
    // Adds "kanji" to the start of the recentKanji string
    chrome.runtime.sendMessage({type: "new-recent-kanji", kanji: kanji});
}

function StoreQueryData(query) {
    chrome.runtime.sendMessage({type: "new-query", query: query});
}

function DeleteQueryData(index, query) {
    chrome.runtime.sendMessage({type: "delete-query", index: index, query: query});
}

function GetBookmarkData(callback) {
    chrome.storage.local.get({ bookmarks: {} }, callback);
}

function StoreBookmarkData(bookmark) {
    chrome.runtime.sendMessage({type: "new-bookmark", bookmark: bookmark});
}

function DeleteBookmarkData(bookmarkKey) {
    chrome.runtime.sendMessage({type: "delete-bookmark", bookmarkKey: bookmarkKey});
}


