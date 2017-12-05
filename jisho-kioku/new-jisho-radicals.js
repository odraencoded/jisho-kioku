(function() {
    var radicalEls = document.querySelectorAll('[data-radical]');
    var radicalFilterForm = null;
    
    InitRadicalEnhacements = function() {
        assignRadicalNames();
        createRadicalFilterForm();
        
        // reset when a radical is clicked
        for(var i = 0; i < radicalEls.length; i++) {
            radicalEls[i].addEventListener('click', function() {
                // refocus
                if(radicalFilterInputEl.value != '') {
                    radicalFilterInputEl.focus();
                }
                radicalFilterInputEl.value = "";
                ResetRadicalFilter();
                
            });
        }
        
        // Cause the first radical to be "click"'d on when the filter form is submitted.
        radicalFilterForm.addEventListener('submit', function(e) {
            if(firstRelevantRadical !== null) {
                var clickEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                firstRelevantRadical.dispatchEvent(clickEvent);
            }
            
            e.preventDefault();
            return false;
        });
        
        
            
        var radicalFilterInputEl = document.getElementById('radical-filter');
        radicalFilterInputEl.addEventListener('input', function() {
            if(radicalFilterInputEl.value === '') {
                ResetRadicalFilter();
            } else {
                var filter = RadicalFilterForInput(radicalFilterInputEl.value)
                ApplyRadicalFilter(filter);
            }
        });
    }
    
    function assignRadicalNames() {
        for(var i = 0; i < radicalEls.length; i++) {
            var radicalEl = radicalEls[i];
            var radicalId = radicalEl.getAttribute('data-radical');
            var radicalData = RadicalTable[radicalId];
            if(radicalData) {
                radicalEl.setAttribute('title', 'Name: ' + radicalData.readings[0]);
            } else {
                radicalEl.setAttribute('title', 'Name: ?');
            }
        }
    }
    
    function createRadicalFilterForm() {
        radicalFilterForm = document.createElement('form');
        radicalFilterForm.innerHTML = '<label>' +
            '<span id="radical-filter-label">Filter radicals:</span> ' +
            '<input id="radical-filter" type="text">' +
        '</label>';
        
        var radicalAreaEl = document.getElementById('radical_area');
        var resetRadicalsEl = document.querySelector('#radical_area .radical_table');
        radicalAreaEl.insertBefore(radicalFilterForm, resetRadicalsEl);
    }

    function RadicalFilterForInput(input) {
        // Populate katakana / romaji readings for radicals.
        BuildRadicalsSynonymReadings();
        
        var input = ConvertFullWithCharacters(input);
        
        var nameFilter = null;
        var onlyAvailable = false;
        var selectedIndex = null;
        var selectedStrokeCount = null;
        
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
            nameFilter = matches[1];
            
            // Remove ' from filter.
            // Easy way to make kan'nyou and kannyou match かんにょう
            nameFilter = nameFilter.replace('\'', '');
        }
        
        // Stroke count part
        if(matches[3]) {
            selectedStrokeCount = parseInt(matches[3]);
        }
        
        // Available part
        if(matches[4]) {
            onlyAvailable = true;
        }
        
        // Index part
        if(matches[5]) {
            selectedIndex = parseInt(matches[5]);
        }
        
        return function(radicalId, status) {
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
            if(nameFilter === null) {
                passedNameFilter = true;
            } else if(radicalData) {
                for(var i = 0; i < radicalData.readings.length; i++) {
                    var reading = radicalData.readings[i];
                    if(reading.startsWith(nameFilter)) {
                        passedNameFilter = true;
                        break;
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

    /*
        Converts full width numerals and math symbols to half width.
        
        Because some people just type them wide.
    */
    function ConvertFullWithCharacters(str) {
        var fullWidthRegex = /[１２３４５６７８９０＋＝]/g;
        var charCodeOffset = '0'.charCodeAt(0) - '０'.charCodeAt(0);
        
        str = str.replace(fullWidthRegex, function(match) {
            return String.fromCharCode(match.charCodeAt(0) + charCodeOffset);
        });
        
        return str;
    }

    function ApplyRadicalFilter(filterCb) {
        var radicalTableEl = document.querySelector('.radical_table');
        
        var numberEl = null;
        var numberGroupCount = 0;
        
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
    }

    function ResetRadicalFilter() {
        ApplyRadicalFilter(function() {
            return true;
        });
    }
})();
