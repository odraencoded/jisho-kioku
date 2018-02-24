var SEARCH_URL = '/search/';
var SEARCH_PREFIX = '/search';
var jishoSearchForm = document.getElementById('search');

var options = {
    recentKanjiCopy: true,
    bookmarksShowMeanings: true,
    bookmarksShowFurigana: true
}


InitRadicalEnhacements();
InitKanjiKioku();
InitDeckKioku();

// Load defaults
loadDefaultData();

// Create kioku menu
createMenu();

// Records what's been searched for in this page.
RecordPageSearch();


AddOnDataChangedListener(function(changes) {
    OnChangedKanjiData(changes);
    OnChangedSearchData(changes);
    OnChangedBookmarksData(changes);
    
    for(aKey in changes) {
        if(aKey in options) {
            newValue = changes[aKey].newValue;
            if(newValue != undefined) {
                options[aKey] = newValue;
            }
        }
    }
});

function loadDefaultData() {
    var defaultData = {
        recentKanji: "",
        recentQueries: []
    };
    
    for(aKey in options) {
        defaultData[aKey] = options[aKey];
    }
    
    GetDefaultData(defaultData, function(data) {
        for(aKey in options)
            options[aKey] = data[aKey];
        
        LoadDefaultKanjiData(data);
        LoadDefaultSearchData(data);
    });
}

function createMenu() {
    // Trying to figure out where to put the menu
    var jishoHookEl = undefined;
    if(window.location.pathname.startsWith(SEARCH_PREFIX)) {
        jishoHookEl = document.getElementById('primary');
    } else if(window.location.pathname == '/') {
        jishoHookEl = document.getElementById('page_container');
    }
    
    if(!jishoHookEl) {
        // welp, nowhere to put it, might as well give up.
        return;
    }
    
    var menuContainer = document.createElement('div');
    var topLink = document.createElement('a');
    topLink.innerText = 'kioku';
    topLink.href = '#';
    menuContainer.appendChild(topLink);
    
    jishoHookEl.insertBefore(menuContainer,  jishoHookEl.firstChild);
    
    var submenu = undefined;
    var searchesDiv = undefined;
    var bookmarksDiv = undefined;
    
    topLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        createSubMenu();
        if(submenu.hasAttribute('hidden')) {
            submenu.removeAttribute('hidden');
        } else {
            submenu.setAttribute('hidden', 'hidden');
        }
        
        return false;
    });

    function createSubMenu() {
        if(submenu){
            return;
        }
        submenu = document.createElement('div');
        submenu.className = 'kioku-submenu-container';
        submenu.setAttribute('hidden', 'hidden');
        menuContainer.appendChild(submenu);
        
        
        var searchesTabLoaded = false;
        var bookmarksTabLoaded = false;
        
        var bookmarksLink = document.createElement('a');
        var searchesLink = document.createElement('a');
        
        searchesLink.innerText = 'Searches';
        searchesLink.href = '#';
        submenu.appendChild(searchesLink);
        
        bookmarksLink.innerText = 'Bookmarks';
        bookmarksLink.href = '#';
        submenu.appendChild(bookmarksLink);
        
        // Create tabs
        searchesDiv = document.createElement('div');
        searchesDiv.setAttribute('data-name', 'searches')
        menuContainer.appendChild(searchesDiv);
        
        bookmarksDiv = document.createElement('div');
        bookmarksDiv.setAttribute('data-name', 'bookmarks')
        menuContainer.appendChild(bookmarksDiv);
        
        // Link tab links
        makeKiokuTabLink(searchesLink, searchesDiv);
        makeKiokuTabLink(bookmarksLink, bookmarksDiv);
        
        // Show default tab
        showKiokuTab(searchesDiv);
        
        function makeKiokuTabLink(tabLink, tab) {
            tabLink.addEventListener('click', function(e) {
                e.preventDefault();
                showKiokuTab(tab);
                return false;
            });
        }
        
        function showKiokuTab(shownTab) {
            searchesDiv.setAttribute('hidden', 'hidden');
            bookmarksDiv.setAttribute('hidden', 'hidden');
            shownTab.removeAttribute('hidden');
            var tabName = shownTab.getAttribute('data-name');
            if(tabName == 'searches') {
                initSearchesTab();
            } else if(tabName == 'bookmarks') {
                initBookmarksTab();
            }
        }
        
        function initSearchesTab() {
            if(searchesTabLoaded) {
                return;
            }
            
            var title = document.createElement('b');
            title.innerText = 'Recent Searches';
            searchesDiv.appendChild(title);
            var mainDiv = document.createElement('div');
            searchesDiv.appendChild(mainDiv);
            SetupBrowseSearchesDiv(mainDiv);
            
            searchesTabLoaded = true;
        }
        
        function initBookmarksTab() {
            if(bookmarksTabLoaded) {
                return;
            }
            
            var title = document.createElement('b');
            title.innerText = 'Bookmarked Vocabulary';
            bookmarksDiv.appendChild(title);
            
            var optionsDiv = document.createElement('div');
            bookmarksDiv.appendChild(optionsDiv);
            optionsDiv.innerHTML = (
                '<label>'
                    +'<input type="checkbox" id="kioku-bookmarks-show-furigana">'
                    + ' furigana'
                + '</label>'
                + ' '
                + '<label>'
                    +'<input type="checkbox" id="kioku-bookmarks-show-meanings">'
                    + ' meanings'
                + '</label>'
            );
            optionsDiv.className = 'kioku-bookmarks-options';
            
            var showFurigana = document.getElementById('kioku-bookmarks-show-furigana');
            var showMeanings = document.getElementById('kioku-bookmarks-show-meanings');
            
            showFurigana.checked = options.bookmarksShowFurigana;
            showMeanings.checked = options.bookmarksShowMeanings;
            
            
            var mainDiv = document.createElement('div');
            bookmarksDiv.appendChild(mainDiv);
            SetupBrowseBookmarksDiv(mainDiv);
            
            refreshBookmarkDivClasses();
            
            showFurigana.addEventListener('change', changedBookmarkSettings);
            showMeanings.addEventListener('change', changedBookmarkSettings);
            
            function changedBookmarkSettings() {
                options.bookmarksShowFurigana = showFurigana.checked;
                options.bookmarksShowMeanings = showMeanings.checked;
                
                SaveOptionsData({
                    bookmarksShowFurigana: showFurigana.checked,
                    bookmarksShowMeanings: showMeanings.checked
                });
                
                refreshBookmarkDivClasses();
            }
            
            function refreshBookmarkDivClasses() {
                var className = '';
                if(showFurigana.checked) {
                    className += ' kioku-bookmarks-show-furigana';
                } else {
                    className += ' kioku-bookmarks-hide-furigana';
                }
                
                if(showMeanings.checked) {
                    className += ' kioku-bookmarks-show-meanings';
                } else {
                    className += ' kioku-bookmarks-hide-meanings';
                }
                
                mainDiv.className = className;
            }
            
            
            bookmarksTabLoaded = true;
        }
    }
}


TellJishoTheResultsChangedSoTheHeightOfTheThingDoesntGoWeird = function() {
    // help Jisho fix not screw up the radical area height
    var resultsEvent = new CustomEvent('results_changed');
    jishoSearchForm.dispatchEvent(resultsEvent);   
}