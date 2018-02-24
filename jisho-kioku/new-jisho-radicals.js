(function() {
    var radicalEls = document.querySelectorAll('[data-radical]');
    var radicalFilterForm = null;
    var radicalFilterQueryKanjiEl = null;
    var radicalFilterInputEl = null;
    var firstRelevantRadical = null;
    var queryRadicalsButtonShown = false;
    var filteringByKanji = false;
    var inputFilterSettings = null;
    var activeKanjiRadicalsQueries = {};
    var kanjiRadicalsCache = {};
    
    InitRadicalEnhacements = function() {
        assignRadicalNames();
        createRadicalFilterForm();
        
        // reset when a radical is clicked
        for(var i = 0; i < radicalEls.length; i++) {
            radicalEls[i].addEventListener('click', function() {
                if(radicalFilterInputEl.value != '') {
                    // refocus
                    radicalFilterInputEl.focus();
                    
                    var inputSettings = GetInputFilterSettings();
                    if(inputSettings.kanjiRadicalsMode) {
                        // do nothing
                    } else {
                        radicalFilterInputEl.value = '';
                        RefreshRadicalFilterFromInput();
                    }
                }
            });
        }
        
        // Cause the first radical to be "click"'d on when the filter form is submitted.
        radicalFilterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if(firstRelevantRadical !== null) {
                var clickEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                firstRelevantRadical.dispatchEvent(clickEvent);
            } else if(queryRadicalsButtonShown) {
                var clickEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                radicalFilterQueryKanjiEl.dispatchEvent(clickEvent);
            }
            
            return false;
        });
        
        radicalFilterInputEl = document.getElementById('radical-filter');
        radicalFilterInputEl.addEventListener('input', function() {
            RefreshRadicalFilterFromInput();
        });
        
        radicalFilterQueryKanjiEl = document.getElementById('radical-filter-query-kanji');
        radicalFilterQueryKanjiEl.addEventListener('click', function() {
            QueryKanjiRadicalsFromInput();
        });
        
        setQueryRadicalsVisibility(false);
        setQueryRadicalsState('normal');
    }
    
    function assignRadicalNames() {
        for(var i = 0; i < radicalEls.length; i++) {
            var radicalEl = radicalEls[i];
            var radicalId = radicalEl.getAttribute('data-radical');
            var radicalData = RadicalTable[radicalId];
            var radicalName = null;
            if(radicalData) {
                radicalName = radicalData.readings[0];
            } else {
                console.warn('Missing radical data. ID: ' + radicalId)
            }
            
            if(radicalName) {
                radicalEl.setAttribute('title', 'Name: ' + radicalName);
            } else {
                radicalEl.setAttribute('title', 'Name: ?');
            }
        }
    }
    
    function createRadicalFilterForm() {
        radicalFilterForm = document.createElement('form');
        radicalFilterForm.innerHTML = '<label id="radical-filter-label-container">' +
            '<span id="radical-filter-label">Filter radicals:</span> ' +
            '<input id="radical-filter" type="text">' +
        '</label><button type="button" id="radical-filter-query-kanji">Query Kanji</button>';
        
        var radicalAreaEl = document.getElementById('radical_area');
        var resetRadicalsEl = document.querySelector('#radical_area .radical_table');
        radicalAreaEl.insertBefore(radicalFilterForm, resetRadicalsEl);
    }

    function setQueryRadicalsVisibility(showQueryRadicals) {
        queryRadicalsButtonShown = showQueryRadicals;
        
        if(queryRadicalsButtonShown) {
            radicalFilterQueryKanjiEl.style.display = 'inline';
        } else {
            radicalFilterQueryKanjiEl.style.display = 'none';
        }
    }
    
    function setQueryRadicalsState(state) {
        if(state == 'querying') {
            radicalFilterQueryKanjiEl.innerText = 'Querying...';
        } else if(state == 'error') {
            radicalFilterQueryKanjiEl.innerText = 'Error!';
        } else {
            radicalFilterQueryKanjiEl.innerText = 'Query Kanji';
        }
    }
    
    function GetInputFilterSettings() {
        if(!inputFilterSettings) {
            var inputValue = radicalFilterInputEl.value;
            inputFilterSettings = ParseFilterSettings(inputValue);
        }
            
        return inputFilterSettings;
    }
    
    function ParseFilterSettings(input) {
        var result = {
            nameFilter: null,
            onlyAvailable: false,
            selectedIndex: null,
            selectedStrokeCount: null,
            validRadicals: null,
            kanjiRadicalsMode: false,
            kanjiInNameFilter: null
        }
        
        input = input.trim();
        if(input.length == 0) {
            return result;
        }
        
        input = ConvertFullWithCharacters(input);
        
        // Filter pattern examples
        // ひ
        // Radical name begins with ひ
        // +
        // Show only available* radicals.
        // =4
        // Show only radicals with 4 strokes.
        // 2
        // Show only the second radical.
        // ひ=4
        // Begins with ひ, has 4 strokes.
        // ひ2
        // Show only the second radical beginning with ひ.
        // ひ=4=2
        // Show only the second radical beginning with ひ that has 4 strokes.
        // ひ+
        // Show radicals beginning with ひ that are available*.
        // ひ=4+2 or ひ=4=+2
        // Same as ひ=4=2 but only show available* radicals.
        // *available means the button is not disabled.
        var pattern = /^(.*?)(=(\d+)?=?)?(\+)?(\d+)?$/;
        var matches = pattern.exec(input);
        
        // Name part
        if(matches[1]) {
            var nameFilter = matches[1];
            
            // Remove ' from filter.
            // Easy way to make kan'nyou and kannyou match かんにょう
            nameFilter = nameFilter.replace('\'', '');
            nameFilter = nameFilter.trim();
            
            if(nameFilter.length > 0) {
                function isLetter(text, idx) {
                    var charCode = text.charCodeAt(idx);
                    return (
                        (charCode >= 65 && charCode <= 90)
                        || (charCode >= 97 && charCode <= 122)
                        || (charCode >= 65313 && charCode <= 65338)
                        || (charCode >= 65345 && charCode <= 65370)
                    )
                }
                
                if(!isLetter(nameFilter, 0)) {
                    // understands おｋ as just お
                    // so while converting romaji to kana in the IME 
                    // the filter doesn't clear all results
                    for(var i = nameFilter.length - 1; i > 0; i--) {
                        if(!isLetter(nameFilter, i)) {
                            break;
                        }
                    }
                    
                    nameFilter = nameFilter.substring(0, i + 1);
                }
            }
            
            result.nameFilter = nameFilter;
        }
        
        // Stroke count part
        if(matches[3]) {
            result.selectedStrokeCount = parseInt(matches[3]);
        }
        
        // Available part
        if(matches[4]) {
            result.onlyAvailable = true;
        }
        
        // Index part
        if(matches[5]) {
            result.selectedIndex = parseInt(matches[5]);
        }
        
        if(result.nameFilter) {
            // strips ASCII + katakana + hiragana blocks.
            result.kanjiInNameFilter = result.nameFilter.replace(
                /[\u0000-\u00FF\uFF00-\uFFEF\u30A0-\u30FF\u3040-\u309F]/g, ''
            );
        }
        
        var cachedKanjiRadicals = GetKanjiRadicalsCached(result.kanjiInNameFilter);
        if(cachedKanjiRadicals) {
            result.validRadicals = cachedKanjiRadicals;
            result.kanjiRadicalsMode = true;
        }
        
        return result;
    }
    
    
    function RadicalFilterForSettings(filterSettings) {
        var nameFilter = filterSettings.nameFilter;
        var onlyAvailable = filterSettings.onlyAvailable;
        var selectedIndex = filterSettings.selectedIndex;
        var selectedStrokeCount = filterSettings.selectedStrokeCount;
        var validRadicals = filterSettings.validRadicals;
        var kanjiRadicalsMode = filterSettings.kanjiRadicalsMode
        
        return function(radicalId, status) {
            if(validRadicals) {
                if(validRadicals.indexOf(radicalId) == -1) {
                    return false;
                }
            }
            
            if(onlyAvailable && !status.available) {
                return false;
            }
            
            var radicalData = RadicalTable[radicalId];
            if(selectedStrokeCount !== null) {
                if(!radicalData) {
                    return false;
                } else if(selectedStrokeCount !== radicalData.strokes) {
                    return false;
                }
            }
            
            var passedNameFilter = false;
            if(nameFilter === null || kanjiRadicalsMode) {
                passedNameFilter = true;
            } else if(radicalData) {
                if(radicalData.jishoText == nameFilter) {
                    passedNameFilter = true;
                } else {
                    for(var i = 0; i < radicalData.readings.length; i++) {
                        var reading = radicalData.readings[i];
                        if(reading.startsWith(nameFilter)) {
                            passedNameFilter = true;
                            break;
                        }
                    }
                }
            }
            
            if(!passedNameFilter) {
                return false;
            }
            
            if(selectedIndex === null) {
                return true;
            } else {
                // When there is an index filter, return false N times for radicals
                // that passed the filters until N equals the selected index.
                // Then continue returning false.
                if(status.indexCount + 1 === selectedIndex) {
                    status.indexCount += 1;
                    return true;
                } else {
                    status.indexCount += 1;
                    return false;
                }
            }
            return false;
        }
    }
    
    
    function CloneFilterSettings(oldSettings) {
        return {
            nameFilter: oldSettings.nameFilter,
            onlyAvailable: oldSettings.onlyAvailable,
            selectedIndex: oldSettings.selectedIndex,
            selectedStrokeCount: oldSettings.selectedStrokeCount,
            validRadicals: oldSettings.validRadicals
        }
    };
    /*
        Converts full width numerals and math symbols to half width.
        
        Because some people just type them wide.
    */
    function ConvertFullWithCharacters(str) {
        var fullWidthRegex = /[１２３４５６７８９０＋＝Ａ-Ｚａ-ｚ]/g;
        var charCodeOffset = '0'.charCodeAt(0) - '０'.charCodeAt(0);
        var widthCharCodeOffset = 'b'.charCodeAt(0) - 'ｂ'.charCodeAt(0);
        
        str = str.replace(fullWidthRegex, function(match) {
            var charCode = match.charCodeAt(0);
            if(charCode >= 65313 && charCode <= 65338) {
                var newCharCode = charCode + widthCharCodeOffset;
            } else if(charCode >= 65345 && charCode <= 65370) {
                var newCharCode = charCode + widthCharCodeOffset;
            } else {
                var newCharCode = charCode + charCodeOffset;
            }
            return String.fromCharCode(newCharCode);
        });
        
        return str;
    }
    
    
    function RefreshRadicalFilterFromInput() {
        var value = radicalFilterInputEl.value;
        value = value.trim();
        
        var showQueryRadicals = false;
        
        inputFilterSettings = null;
        
        if(value === '') {
            ResetRadicalFilter();
            showQueryRadicals = false;
        } else {
            inputFilterSettings = GetInputFilterSettings();
            var filter = RadicalFilterForSettings(inputFilterSettings);
            var result = ApplyRadicalFilter(filter);
            
            if(!inputFilterSettings.kanjiRadicalsMode) {
                var kanjiInNameFilter = inputFilterSettings.kanjiInNameFilter;
                if(kanjiInNameFilter && kanjiInNameFilter.length >= 1) {
                    showQueryRadicals = true;
                }
            }
        }
        
        setQueryRadicalsVisibility(showQueryRadicals);
        setQueryRadicalsState('normal');
        
        TellJishoTheResultsChangedSoTheHeightOfTheThingDoesntGoWeird();
    }
    
    
    function ApplyRadicalFilter(filterCb) {
        // Populate katakana / romaji readings for radicals.
        BuildRadicalsSynonymReadings();
        
        var radicalTableEl = document.querySelector('.radical_table');
        
        var numberEl = null;
        var numberGroupCount = 0;
        
        result = {
            totalShownRadicals: 0,
        }
        
        firstRelevantRadical = null;
        
        var status = {
            available: true,
            indexCount: 0
        };
        
        for(var i = 0; i < radicalTableEl.children.length; i++) {
            var el = radicalTableEl.children[i];
            
            // Some elements on the radical table are not radicals but stroke count
            // numbers instead.
            var isNumberSquare = el.className.indexOf('number') !== -1;
            if(isNumberSquare) {
                // Hiding the previous stroke count number when all radicals of that
                // stroke count have been filtered out.
                if(numberEl !== null) {
                    if(numberGroupCount === 0) {
                        numberEl.style.display = 'none';
                    } else {
                        numberEl.style.display = 'block';
                    }
                }
                
                numberEl = el;
                numberGroupCount = 0;
            } else {
                status.available = el.className.indexOf('available') !== -1;
                
                var radicalId = el.getAttribute('data-radical');
                var showRadical = filterCb(radicalId, status);
                
                if(showRadical) {
                    if(firstRelevantRadical === null) {
                        firstRelevantRadical = el;
                    }
                    el.style.display = 'block';
                    numberGroupCount += 1;
                    result.totalShownRadicals += 1;
                } else {
                    el.style.display = 'none';
                }
            }
        }
        
        if(numberEl !== null) {
            if(numberGroupCount === 0) {
                numberEl.style.display = 'none';
            } else {
                numberEl.style.display = 'block';
            }
        }
        
        TellJishoTheResultsChangedSoTheHeightOfTheThingDoesntGoWeird();
        
        return result;
    }
    
    function RememberKanjiRadicals(kanji, radicals) {
        // NOTE: save it to local storage?
        kanjiRadicalsCache[kanji] = radicals;
    }
    
    function GetKanjiRadicalsCached(kanji) {
        return kanjiRadicalsCache[kanji];
    }
    
    function QueryKanjiRadicalsFromInput() {
        var filterSettings = GetInputFilterSettings();
        var kanji = filterSettings.kanjiInNameFilter;
        if(!kanji || IsQueryingKanji(kanji)) {
            return;
        }
        
        setQueryRadicalsState('querying');
        
        FetchKanjiRadicals(kanji, function(kanjiRadicals) {
            RememberKanjiRadicals(kanji, kanjiRadicals);
            
            var currentFilterSettings = GetInputFilterSettings();
            if(currentFilterSettings.kanjiInNameFilter != kanji) {
                // changed during async, abort.
                return;
            }
            
            RefreshRadicalFilterFromInput();
            
        });
    }
    
    function IsQueryingKanji(kanji) {
        return !!activeKanjiRadicalsQueries[kanji];
    }
    
    function FetchKanjiRadicals(kanji, cb) {
        FetchKanjiRadicalsByHtml(kanji, cb);
    }
    
    /* Replace when (if) Jisho gets an API to query radicals. */
    function FetchKanjiRadicalsByHtml(kanji, cb) {
        activeKanjiRadicalsQueries[kanji] = true;
        
        var url = '/search/' + kanji + ' %20%23kanji';
        
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            activeKanjiRadicalsQueries[kanji] = false;
            /* complete */
            if (req.readyState == XMLHttpRequest.DONE) {
                parser = new DOMParser();
                var resp = parser.parseFromString(req.responseText, "text/html");
                var radicalBlocks = resp.querySelectorAll(".kanji.details .radicals");
                
                // how to get radicals without markup:
                // step 1: get stuff as text 'cause the markup doesn't help anyway
                // step 2: separate the words, remove useless punctuation
                // step 3: BRUTE FORCE ALL THE WAY THROUGH!!!111111
                // step 3a: by which I mean checking them against a table, obviously
                var radicalBlockText = [];
                for(var i = 0; i < radicalBlocks.length; i++) {
                    radicalBlockText.push(radicalBlocks[i].innerText);
                }
                var radicalText = radicalBlockText.join(' ');
                var radicalText = radicalText.replace(/[\(\)\[\],:.]/g, ' ')
                var radicalWords = radicalText.split(/\s+/);
                
                var radicalIds = [];
                for(var i = 0; i < radicalWords.length; i++) {
                    var w = radicalWords[i];
                    var rad = RadicalMap[w];
                    if(rad) {
                        radicalIds.push(rad.jishoId);
                    }
                }
                
                cb(radicalIds);
            }
        };
        
        req.open("GET", url, true);
        req.send();
    }

    function ResetRadicalFilter() {
        ApplyRadicalFilter(function() {
            return true;
        });
    }
})();
