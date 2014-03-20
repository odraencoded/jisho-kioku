var defaultOptions = {
	recentKanjiLimit: 200,
	recentKanjiCopy: true
};

var form = document.querySelector("form");
form.removeAttribute("hidden");

var fields = {
	recentKanjiLimit: document.querySelector("[name=recent-kanji-limit]"),
	recentKanjiCopy: document.querySelector("[name=recent-kanji-copy]")
};

function wasModified() {
	for(aKey in fields) {
		var aField = fields[aKey];
		if(aField.type == "checkbox") {
			if(aField.checked != aField.defaultChecked) {
				return true;
			}
		} else {
			if(aField.value != aField.defaultValue) {
				return true;
			}
		}
	}
	return false;
}

function updateDefaults(newValues) {
	for(aKey in newValues) {
		if(aKey in fields) {
			var aNewValue = newValues[aKey];
			var aField = fields[aKey];
			if(aField.type == "checkbox") {
				if(aField.checked == aField.defaultChecked) {
					aField.checked = aNewValue;
				}
				aField.defaultChecked = aNewValue;
			} else {
				if(aField.value == aField.defaultValue) {
					aField.value = aNewValue;
				}
				aField.defaultValue = aNewValue;
			}
		}
	}
}

function updateFields(newValues) {
	for(aKey in newValues) {
		if(aKey in fields) {
			var aNewValue = newValues[aKey];
			var aField = fields[aKey];
			if(aField.type == "checkbox") {
				aField.checked = aNewValue;
			} else {
				aField.value = aNewValue;
			}
		}
	}
}

chrome.storage.onChanged.addListener(function(changes, areaName) {
	// Refreshes the #recent_kanji div when the stored recent kanji changes
	console.log("changed")
	if(areaName == "local") {
		var newValues = {};
		for(var aKey in changes) {
			if(aKey in fields) {
				var aNewValue = changes[aKey].newValue;
				if(aNewValue != undefined) {
					newValues[aKey] = aNewValue;
				}
			}
		}
		updateDefaults(newValues);
	}
});

chrome.storage.local.get(defaultOptions, function(data) {
	// if recentKanji is not undefined, it's already been
	// set by the chrome.storage.onChanged event handler
	updateDefaults(data);
	form.onsubmit = function() {
		var newValues = {};
		newValues.recentKanjiLimit = fields.recentKanjiLimit.valueAsNumber;
		newValues.recentKanjiCopy = fields.recentKanjiCopy.checked;
		
		chrome.storage.local.set(newValues);
		return false;
	};
	form["to-defaults"].onclick = function() {
		updateFields(defaultOptions);
	};
});

window.onbeforeunload = function() {
	if(wasModified())
		return "The options on this page are not saved!";
}