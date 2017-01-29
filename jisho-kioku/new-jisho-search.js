(function() {
    // Recent queries setup
    var recentQueriesIsSetup = false;
    var recentQueries = undefined;
    var searchBox = document.querySelector("#keyword");
    var queriesDataList = undefined;
    
    function setupRecentQueries() {
        if(recentQueriesIsSetup) {
            return;
        }
        
        queriesDataList = document.createElement('datalist');
        document.body.appendChild(queriesDataList);
        queriesDataList.id = 'kioku-recent-queries-datalist';
        
        searchBox.setAttribute('list', queriesDataList.id);
        
        recentQueriesIsSetup = true;
    }
    
    function refreshRecentQueries() {
        setupRecentQueries();
        
        queriesDataList.innerHTML = '';
        for(var i = 0; i < recentQueries.length; i++) {
            var rq = recentQueries[i];
            var newOption = document.createElement('option')
            newOption.setAttribute('value', rq);
            queriesDataList.appendChild(newOption);
        }
    }


    // Saves what's been searched for in the search history.
    RecordPageSearch = function() {
        var pathName = window.location.pathname;
        
        if(!pathName.startsWith(SEARCH_URL)) {
            return;
        }
        
        var query = decodeURI(pathName.substr(SEARCH_URL.length));
        if(query.length == 0) {
            return;
        }
        
        StoreQueryData(query);
    }
    
    OnChangedSearchData = function(changes) {
        if(changes.recentQueries) {
            recentQueries = changes.recentQueries.newValue || [];
            refreshRecentQueries();
        }
    }
    
    LoadDefaultSearchData = function(data) {
        // if recentQueries is not undefined, it's already been
        // set by the chrome.storage.onChanged event handler
        if(recentQueries == undefined) {
            recentQueries = data.recentQueries;
            refreshRecentQueries();
        }
    }
    
    SetupBrowseSearchesDiv = function(div) {
        if(recentQueries.length == 0) {
            var msg = document.createElement('span');
            msg.innerText = "No recorded searches yet.";
            div.appendChild(msg);
            return;
        }
        
        var itemList = document.createElement('ol');
        itemList.className = 'kioku-searches-list';
        div.appendChild(itemList);
        for(var i = 0; i < recentQueries.length; i++) {
            var q = recentQueries[i];
            
            var li = document.createElement('li')
            itemList.appendChild(li);
            
            var link = document.createElement('a');
            link.innerText = q;
            link.href = SEARCH_URL + encodeURI(q);
            
            li.appendChild(link);
        }
    }
})();
