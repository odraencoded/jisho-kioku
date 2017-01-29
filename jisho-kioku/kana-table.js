
var hiraKataDiff = "あ".charCodeAt(0) - "ア".charCodeAt(0);

// Returns a string of katakana from a string of hiragana
function ConvertHiraganaToKatakana(hira) {
    var result = '';
    for(var i = 0; i < hira.length; i++) {
        result += String.fromCharCode(hira.charCodeAt(i) - hiraKataDiff)
    }
    return result;
}



var romajiTable = {
    'あ': 'a',
    'い': 'i',
    'う': 'u',
    'え': 'e',
    'お': 'o',
    
    'か': 'ka',
    'き': 'ki',
    'く': 'ku',
    'け': 'ke',
    'こ': 'ko',
    
    'が': 'ga',
    'ぎ': 'gi',
    'ぐ': 'gu',
    'げ': 'ge',
    'ご': 'go',
    
    'さ': 'sa',
    'し': 'shi',
    'す': 'su',
    'せ': 'se',
    'そ': 'so',
    
    'ざ': 'za',
    'じ': 'zi',
    'ず': 'zu',
    'ぜ': 'ze',
    'ぞ': 'zo',
    
    'た': 'ta',
    'ち': 'chi',
    'つ': 'tsu',
    'て': 'te',
    'と': 'to',
    
    'だ': 'do',
    'ぢ': 'di',
    'づ': 'du',
    'で': 'de',
    'ど': 'do',
    
    'な': 'na',
    'に': 'ni',
    'ぬ': 'nu',
    'ね': 'ne',
    'の': 'no',
    
    'は': 'ha',
    'ひ': 'hi',
    'ふ': 'fu',
    'へ': 'he',
    'ほ': 'ho',
    
    'ば': 'ba',
    'び': 'bi',
    'ぶ': 'bu',
    'べ': 'be',
    'ぼ': 'bo',
    
    'ぱ': 'pa',
    'ぴ': 'pi',
    'ぷ': 'pu',
    'ぺ': 'pe',
    'ぽ': 'po',
    
    'ま': 'ma',
    'み': 'mi',
    'む': 'mu',
    'め': 'me',
    'も': 'mo',
    
    'や': 'ya',
    'ゆ': 'yu',
    'よ': 'yo',
    'ゃ': 'ya',
    'ゅ': 'yu',
    'ょ': 'yo',
    
    'ら': 'ra',
    'り': 'ri',
    'る': 'ru',
    'れ': 're',
    'ろ': 'ro',
    
    'わ': 'wa',
    'を': 'wo',
    'ん': 'n',
    
    'ちゃ': 'cha',
    'ちゅ': 'chu',
    'ちょ': 'cho',
    
    'しゃ': 'sha',
    'しゅ': 'shu',
    'しょ': 'sho',
};

function GetRomajiForHiragana(hira) {
    var romaji = '';
    
    for(var i = 0; i < hira.length; i++) {
        var kana = hira[i];
        
        if(kana == 'っ') {
            var littleTsuMode = true;
            continue;
        }
        
        var roma = romajiTable[kana];
        
        if(littleTsuMode) {
            roma = roma[0] + roma;
            littleTsuMode = false;
        }
        
        
        if('ゃゅょ'.indexOf(kana) !== -1) {
            var previousKana = hira[i -1]
            var previousRoma = romajiTable[previousKana];
            
            // undo previous romanization
            romaji = romaji.substr(0, romaji.length - previousRoma.length)
            
            
            // compound kana romanization
            roma = romajiTable[previousKana + kana];
            if(!roma) {
                roma = previousRoma[0] + romajiTable[kana];
            }
        }
        
        romaji += roma;
    }
    
    return romaji;
}