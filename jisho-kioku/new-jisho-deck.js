(function() {
    var bookmarksBrowsingDiv = undefined;
    
    InitDeckKioku = function() {
        addBookmarkLinks();
    }
    
    function addBookmarkLinks() {
        var conceptDetailLinks = document.querySelectorAll('.concept_light .light-details_link');
        for(var i = 0; i < conceptDetailLinks.length; i++) {
            var cdl = conceptDetailLinks[i];
            
            var bookmarkLink = document.createElement('a');
            bookmarkLink.innerText = 'Memorize'
            bookmarkLink.className = 'light-details_link kioku-bookmark_link';
            bookmarkLink.href = '#';
            
            cdl.parentNode.insertBefore(bookmarkLink, cdl.nextSibling);
            
            bookmarkLink.addEventListener('click', bookmarkButtonClicked);
        }
    }
    
    function bookmarkButtonClicked(e) {
        e.preventDefault();
        
        var bookmarked = this.getAttribute('data-bookmarked');
        if(bookmarked) {
            this.innerText = 'Forgotten!';
            
            this.removeAttribute('data-bookmarked');
            DeleteBookmarkData(bookmarked);
            
            return false;
        }
        
        // Get the div that contains all the data we want to bookmark
        var conceptDiv = this;
        while((' ' + conceptDiv.className + ' ').indexOf(' concept_light ') == -1) {
            conceptDiv = conceptDiv.parentNode;
            if(!conceptDiv) {
                return false;
            }
        }
        
        // Assign an id to the div so we can query it.
        var previousId = conceptDiv.id;
        var itemId = previousId;
        if(!itemId) {
            itemId = 'kioku-concept-being-bookmarked';
            conceptDiv.id = itemId;
        }
        var hashId = '#' + itemId;
        
        var bookmarkData = {
            vocab: '',
            furigana: [],
            meanings: []
        };
        
        
        bookmarkData.vocab = document.querySelector(hashId + ' .concept_light-readings .text').innerText;
        
        // Save furigana
        var furiganaItems = document.querySelectorAll(hashId + ' .concept_light-readings .furigana span');
        for(var i = 0; i < furiganaItems.length; i++) {
            var f = furiganaItems[i];
            bookmarkData.furigana.push(f.innerText);
        }
        
        // Save meanings
        var meaningItems = document.querySelectorAll(hashId + ' .meanings-wrapper .meaning-meaning, ' + hashId + ' .meanings-wrapper .meaning-tags');
        
        for(var i = 0; i < meaningItems.length; i++) {
            var m = meaningItems[i];
            if((' ' + m.className + ' ').indexOf(' meaning-tags ') != -1) {
                bookmarkData.meanings.push('[' + m.innerText + ']');
            } else {
                bookmarkData.meanings.push(m.innerText);
            }
        }
        
        // Return to the previous id if it had one.
        conceptDiv.id = previousId;
        
        // Save data
        StoreBookmarkData(bookmarkData);
        
        var bookmarkKey = bookmarkData.vocab + '---' + bookmarkData.furigana.join('');
        this.setAttribute('data-bookmarked', bookmarkKey);
        this.innerText = 'Bookmarked!';
        
        return false;
    }
    
    SetupBrowseBookmarksDiv = function(div) {
        bookmarksBrowsingDiv = div;
        
        var loading = document.createElement('div');
        loading.innerText = 'Loading...';
        div.appendChild(loading);
        GetBookmarkData(function(data) {
            populateBookmarksDiv(data.bookmarks);
        });
    }
    
    
    function populateBookmarksDiv(bookmarks) {
        if(!bookmarksBrowsingDiv) {
            return;
        }
        
        var div = bookmarksBrowsingDiv;
        div.innerHTML = '';
        
        var itemList = document.createElement('ul');
        itemList.className = 'kioku-bookmarks-list';
        div.appendChild(itemList);
        
        for(k in bookmarks) {
            var bookmark = bookmarks[k];
            
            var li = document.createElement('li')
            itemList.appendChild(li);
            
            // remove bookmark link 
            var removeLink = document.createElement('a');
            removeLink.innerText = 'Forget';
            removeLink.href = '#';
            removeLink.className = 'kioku-bookmark-remove';
            removeLink.addEventListener('click', (function(bookmarkKey) {
                return function(e) {
                    e.preventDefault();
                    this.innerText = 'Forgetting...';
                    DeleteBookmarkData(bookmarkKey);
                    return false;
                }
            })(k));
            li.appendChild(removeLink);
            
            // vocab link
            
            var link = document.createElement('a');
            
            // Holy Javascripting Christ, Batman!
            // who the fuck thought this kind of markup was a good idea?!
            for(j = 0; j < bookmark.vocab.length; j++) {
                var furigana = bookmark.furigana[j];
                var maybeKanji = bookmark.vocab.charAt(j);
                if(furigana.length == 0) {
                    // creating text elements instead of using innerHTML
                    // coz firefox addons no likey setting innerHTML :(
                    link.appendChild(
                        document.createTextNode(maybeKanji)
                    );
                } else {
                    // same
                    var linkRuby = document.createElement('ruby');
                    linkRuby.appendChild(
                        document.createTextNode(maybeKanji)
                    );
                    var linkRubyRt = document.createElement('rt');
                    linkRubyRt.appendChild(
                        document.createTextNode(furigana)
                    );
                    // can I just say how tiring creating elements like this is?
                    linkRuby.appendChild(linkRubyRt);
                    link.appendChild(linkRuby);
                }
            }
            
            link.href = SEARCH_URL + encodeURI(bookmark.vocab);
            
            var linkContainer = document.createElement('span');
            linkContainer.className = 'kioku-bookmark-vocab-ruby';
            linkContainer.appendChild(link);
            li.appendChild(linkContainer);
            
            // ruby-less link
            var link = document.createElement('a');
            link.innerText = bookmark.vocab;
            link.href = SEARCH_URL + encodeURI(bookmark.vocab);
            
            var linkContainer = document.createElement('span');
            linkContainer.className = 'kioku-bookmark-rubyless-vocab';
            linkContainer.appendChild(link);
            
            
            var furiganaText = '';
            for(j = 0; j < bookmark.vocab.length; j++) {
                var furigana = bookmark.furigana[j];
                var maybeKanji = bookmark.vocab.charAt(j);
                if(furigana.length == 0) {
                    furiganaText += maybeKanji;
                } else {
                    furiganaText += furigana;
                }
            }
            
            if(furiganaText != bookmark.vocab) {
                var furiganaEl = document.createElement('span')
                furiganaEl.className = 'kioku-bookmark-furigana'
                furiganaEl.innerText = furiganaText;
                linkContainer.appendChild(document.createTextNode(" "));
                linkContainer.appendChild(furiganaEl);
            }
            
            li.appendChild(linkContainer);
            
            // Meanings list
            var meaningsList = document.createElement('ol')
            meaningsList.className = 'kioku-bookmark-meanings'
            for(var mi = 0; mi < bookmark.meanings.length; mi++) {
                var m = bookmark.meanings[mi];
                var mli = document.createElement('li')
                if(m.startsWith('[')) {
                    mli.className = '-kioku-tag';
                    mli.innerText = m.substr(1, m.length - 2); // removes [] from [tag]
                } else {
                    mli.className = '-kioku-meaning';
                    mli.innerText = m;
                }
                
                mli.appendChild(document.createTextNode(" "));
                
                meaningsList.appendChild(mli);
            }
            li.appendChild(meaningsList);
        }
        
        if(itemList.childNodes.length == 0) {
            itemList.parentNode.removeChild(itemList);
            
            var msg = document.createElement('span');
            msg.innerText = "No bookmarks yet.";
            div.appendChild(msg);
            return;
        }
    }
    
    OnChangedBookmarksData = function(changes) {
        if(changes.bookmarks) {
            populateBookmarksDiv(changes.bookmarks.newValue);
        }
    }
})();
