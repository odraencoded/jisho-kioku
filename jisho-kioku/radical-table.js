/**
    This script includes data related to radicals.
    
    This list is incomplete, some radicals/readings might be missing.
**/

function Radical(readings, strokes, positions) {
    this.readings = readings;
    this.positions = positions;
    this.strokes = strokes;
}

/**
    Source: http://kanjialive.com/214-traditional-kanji-radicals/
**/
RadicalTable = {
    /* 1 stroke */
      '1': /* 一 */ new Radical(['いち'], 1, [null]),
      '2': /* 丨 */ new Radical(['たてぼう'], 1, [null]),
      '3': /* 丶 */ new Radical(['てん'], 1, [null]),
      '4': /* 丿 */ new Radical(['の'], 1, [null]),
      '5': /* 乙 */ new Radical(['おつ'], 1, [null]),
      '6': /* 亅 */ new Radical(['はねぼう'], 1, [null]),
    
    /* 2 strokes */
      '7': /* 二 */ new Radical(['に'], 2, [null]),
      '8': /* 亠 */ new Radical(['なべぶた'], 2, ['kanmuri']),
      '9': /* 人 */ new Radical(['ひと'], 2, [null]),
     '10': /* 化 */ new Radical(['にんべん'], 2, ['hen']),
     '11': /* 个 */ new Radical(['ひとやね'], 2, ['kanmuri']),
     '12': /* 儿 */ new Radical(['ひとあし', 'にんにょう'], 2, ['ashi']),
     '13': /* 入 */ new Radical(['いる'], 2, [null]),
     '14': /* ハ */ new Radical(['はち'], 2, [null]),
     '15': /* 半 */ new Radical(['はちがしら'], 2, [null]),
     '16': /* 冂 */ new Radical(['けいがまえ'], 2, ['keigamae']),
     '17': /* 冖 */ new Radical(['わかんむり'], 2, ['kanmuri']),
     '18': /* 冫 */ new Radical(['にすい'], 2, ['hen']),
     '19': /* 几 */ new Radical(['きにょう', 'つくえ'], 2, ['tsukuri']),
     '20': /* 凵 */ new Radical(['かんにょう'], 2, ['nyou']),
     '21': /* 刀 */ new Radical(['かたな'], 2, [null]),
     '22': /* 刈 */ new Radical(['りっとう'], 2, ['tsukuri']),
     '23': /* 力 */ new Radical(['ちから'], 2, [null]),
     '24': /* 勹 */ new Radical(['つつみがまえ'], 2, ['tsutsumigamae']),
     '25': /* 匕 */ new Radical(['さじ'], 2, ['tsukuri']),
     '26': /* 匚 */ new Radical(['はこがまえ'], 2, ['hakogamae']),
     '27': /* 十 */ new Radical(['じゅう'], 2, [null]),
     '28': /* 卜 */ new Radical(['ぼく'], 2, [null]),
     '29': /* 卩 */ new Radical(['ふしづくり'], 2, ['tsukuri']),
     '30': /* 厂 */ new Radical(['がんだれ'], 2, ['tare']),
     '31': /* 厶 */ new Radical(['む'], 2, [null]),
     '32': /* 又 */ new Radical(['また'], 2, [null]),
    /* Missing 33 to 36 */
    /* 3 strokes */
    
     '37': /* ⻌ */ new Radical(['しんにょう'], 3, ['nyou']),
     '38': /* 口 */ new Radical(['くち'], 3, [null]),
     '39': /* 囗 */ new Radical(['くにがまえ'], 3, ['kunigamae']),
     '40': /* 土 */ new Radical(['つち'], 3, [null]),
     '41': /* 士 */ new Radical(['さむらい', 'さむらいかんむり'], 3, [null, 'kanmuri']),
     '42': /* 夂 */ new Radical(['のまた'], 3, [null]),
     '43': /* 夕 */ new Radical(['ゆうべ'], 3, [null]),
     '44': /* 大 */ new Radical(['だい'], 3, [null]),
     '45': /* 女 */ new Radical(['おんな', 'おんなへん'], 3, [null, 'hen']),
     '46': /* 子 */ new Radical(['こ', 'こへん'], 3, [null, 'hen']),
     '47': /* 宀 */ new Radical(['うかんむり'], 3, ['kanmuri']),
     '48': /* 寸 */ new Radical(['すん', 'すんづくり'], 3, [null, 'tsukuri']),
     '49': /* 小 */ new Radical(['しょう', 'ちいさい'], 3, [null]),
     '50': /* ⺌ */ new Radical(['しょうかんむり'], 3, ['kanmuri']),
     '51': /* 尢 */ new Radical(['だいのまげあし', 'まげあし'], 3, ['tsukuri']),
     '52': /* 尸 */ new Radical(['しかばね'], 3, ['tare']),
     '53': /* 屮 */ new Radical(['くさのめ'], 3, [null]),
     '54': /* 山 */ new Radical(['やま', 'やまへん'], 3, [null, 'hen']),
     '55': /* 川 */ new Radical(['さんぼんがわ'], 3, [null]),
     '56': /* 巛 */ new Radical(['まがりがわ'], 3, [null]),
     '57': /* 工 */ new Radical(['たくみ', 'たくみへん'], 3, [null, 'hen']),
     '58': /* 已 */ new Radical(['おのれ'], 3, [null]),
     '59': /* 巾 */ new Radical(['はば', 'はばへん'], 3, [null, 'hen']),
     '60': /* 干 */ new Radical(['かん'], 3, [null]),
     '61': /* 幺 */ new Radical(['いとがしら'], 3, [null]),
     '62': /* 广 */ new Radical(['まだれ'], 3, ['tare']),
     '63': /* 廴 */ new Radical(['えんにょう'], 3, ['nyou']),
     '64': /* 廾 */ new Radical(['にじゅうあし'], 3, ['ashi']),
     '65': /* 弋 */ new Radical(['いぐるみ'], 3, [null]),
     '66': /* 弓 */ new Radical(['ゆみ', 'ゆみへん'], 3, [null, 'hen']),
     '67': /* ヨ */ new Radical(['けいがしら'], 3, [null]),
     '68': /* 彑 */ new Radical(['けいがしら'], 3, [null]),
     '69': /* 彡 */ new Radical(['さんづくり'], 3, ['tsukuri']),
     '70': /* 彳 */ new Radical(['ぎょうにんべん'], 3, ['hen']),
     '71': /* 忙 */ new Radical(['りっしんべん'], 3, ['hen']),
     '72': /* 扎 */ new Radical(['てへん'], 3, ['hen']),
     '73': /* 氾 */ new Radical(['さんずい'], 3, ['hen']),
     '74': /* 氾 */ new Radical(['けものへん'], 3, ['hen']),
     '75': /* ⺾ */ new Radical(['くさかんむり'], 3, ['kanmuri']),
     '76': /* ⻏ */ new Radical(['おおざと'], 3, ['tsukuri']),
     '77': /* ⻖ */ new Radical(['こざとへん'], 3, ['hen']),
    /* Missing 78 to 81 */
    /* 4 strokes */
     '82': /* 考 */ new Radical(['おいかんむり'], 4, ['kanmuri']),
     '83': /* 心 */ new Radical(['こころ'], 4, [null]),
     '84': /* 戈 */ new Radical(['ほこ'], 4, [null]),
     '85': /* 戸 */ new Radical(['と', 'とだれ'], 4, [null, 'tare']),
     '86': /* 手 */ new Radical(['て'], 4, [null]),
     '87': /* 支 */ new Radical(['しにょう'], 4, [null]),
     '88': /* 攵 */ new Radical(['ぼくづくり'], 4, ['tsukuri']),
     '89': /* 文 */ new Radical(['ぶん'], 4, [null]),
     '90': /* 斗 */ new Radical(['ますづくり'], 4, ['tsukuri']),
     '91': /* 斤 */ new Radical(['おのづくり'], 4, ['tsukuri']),
     '92': /* 方 */ new Radical(['ほう', 'ほうへん'], 4, [null, 'hen']),
     '93': /* 无 */ new Radical(['むうにょう'], 4, [null]),
     '94': /* 日 */ new Radical(['ひ', 'ひへん'], 4, [null, 'hen']),
     '95': /* 曰 */ new Radical(['ひらび'], 4, [null]),
     '96': /* 月 */ new Radical(['つき', 'つきへん'], 4, [null, 'hen']),
     '97': /* 木 */ new Radical(['き', 'きへん'], 4, [null, 'hen']),
     '98': /* 欠 */ new Radical(['あくび'], 4, [null]),
     '99': /* 止 */ new Radical(['とめる'], 4, [null]),
    '100': /* 歹 */ new Radical(['がつ', 'がつへん'], 4, [null, 'hen']),
    '101': /* 殳 */ new Radical(['るまた'], 4, ['tsukuri']),
    '102': /* 比 */ new Radical(['くらべる'], 4, [null]),
    '103': /* 毛 */ new Radical(['け'], 4, [null]),
    '104': /* 氏 */ new Radical(['うじ'], 4, [null]),
    '105': /* 气 */ new Radical(['きがまえ'], 4, ['kigamae']),
    '106': /* 水 */ new Radical(['みず'], 4, [null]),
    '107': /* 火 */ new Radical(['ひ', 'ひへん'], 4, [null, 'hen']),
    '108': /* 杰 */ new Radical(['れっか'], 4, ['ashi']),
    '109': /* 爪 */ new Radical(['つめ', 'つめかんむり'], 4, [null, 'kanmuri']),
    '110': /* 父 */ new Radical(['ちち'], 4, [null]),
    '111': /* 爻 */ new Radical(['こう'], 4, [null]),
    '112': /* 爿 */ new Radical(['しょうへん'], 4, ['hen']),
    '113': /* 片 */ new Radical(['かた', 'かたへん'], 4, [null, 'hen']),
    '114': /* 牛 */ new Radical(['うし', 'うしへん'], 4, [null, 'hen']),
    '115': /* 犬 */ new Radical(['いぬ'], 4, [null]),
    '116': /* 礼 */ new Radical(['しめすへん'], 4, ['hen']),
    '117': /* 王 */ new Radical(['おう', 'おうへん'], 4, [null, 'hen']),
    /* Missing 118 to 124 */
    '125': /* 毋 */ new Radical(['なかれ'], 4, [null]),
    
    /* 5 strokes */
    '126': /* 玄 */ new Radical(['げん'], 5, [null]),
    '127': /* 瓦 */ new Radical(['かわら'], 5, [null]),
    '128': /* 甘 */ new Radical(['あまい'], 5, [null]),
    '129': /* 生 */ new Radical(['うまれる'], 5, [null]),
    '130': /* 用 */ new Radical(['もちいる'], 5, [null]),
    '131': /* 田 */ new Radical(['た', 'たへん'], 5, [null, 'hen']),
    '132': /* 疋 */ new Radical(['ひき', 'ひきへん'], 5, [null, 'hen']),
    '133': /* 疒 */ new Radical(['やまいだれ'], 5, ['tare']),
    '134': /* 癶 */ new Radical(['はつがしら'], 5, ['kanmuri']),
    '135': /* 白 */ new Radical(['しろ', 'はくへん'], 5, [null, 'hen']),
    '136': /* 皮 */ new Radical(['けがわ'], 5, [null]),
    '137': /* 皿 */ new Radical(['さら'], 5, [null]),
    '138': /* 目 */ new Radical(['め', 'めへん'], 5, [null, 'hen']),
    '139': /* 矛 */ new Radical(['ほこ', 'ほこへん'], 5, [null, 'hen']),
    '140': /* 矢 */ new Radical(['や', 'やへん'], 5, [null, 'hen']),
    '141': /* 石 */ new Radical(['いし', 'いしへん'], 5, [null, 'hen']),
    '142': /* 示 */ new Radical(['しめす'], 5, [null]),
    '143': /* 禸 */ new Radical(['じゅうのあし'], 5, [null]),
    '144': /* 禾 */ new Radical(['のぎへん'], 5, ['hen']),
    '145': /* 穴 */ new Radical(['あな'], 5, [null]),
    '146': /* 立 */ new Radical(['たつ', 'たつへん'], 5, [null, 'hen']),
    '147': /* 初 */ new Radical(['ころもへん'], 5, ['hen']),
    /* Missing 148 to 151 */
    '152': /* 罒 */ new Radical(['あみがしら', 'よこめ'], 5, ['kanmuri']),
    '153': /* 牙 */ new Radical(['きば', 'きばへん'], 5, [null, 'hen']),
    
    /* 6 Strokes */
    '154': /* 瓜 */ new Radical(['うり    '], 6, [null]),
    '155': /* 竹 */ new Radical(['たけ', 'たけかんむり'], 6, [null, 'kanmuri']),
    '156': /* 米 */ new Radical(['こめ', 'こめへん'], 6, [null, 'hen']),
    '157': /* 糸 */ new Radical(['いと', 'いとへん'], 6, [null, 'hen']),
    '158': /* 缶 */ new Radical(['みずがめ'], 6, [null]),
    '159': /* 羊 */ new Radical(['ひつじ'], 6, [null]),
    '160': /* 羽 */ new Radical(['はね'], 6, [null]),
    '161': /* 而 */ new Radical(['しこうして'], 6, [null]),
    '162': /* 耒 */ new Radical(['らいすき'], 6, ['hen']),
    '163': /* 耳 */ new Radical(['みみ', 'みみへん'], 6, [null, 'hen']),
    '164': /* 聿 */ new Radical(['ふでづくり'], 6, [null]),
    '165': /* 肉 */ new Radical(['にく'], 6, [null]),
    '166': /* 自 */ new Radical(['みずから'], 6, [null]),
    '167': /* 至 */ new Radical(['いたる', 'いたるへん'], 6, [null, 'hen']),
    '168': /* 臼 */ new Radical(['うす'], 6, [null]),
    '169': /* 舌 */ new Radical(['した'], 6, [null]),
    '170': /* 舟 */ new Radical(['ふね', 'ふねへん'], 6, [null, 'hen']),
    '171': /* 艮 */ new Radical(['こん'], 6, [null]),
    '172': /* 色 */ new Radical(['いろ'], 6, [null]),
    '173': /* 虍 */ new Radical(['とらがしら'], 6, ['kanmuri']),
    '174': /* 虫 */ new Radical(['むし', 'むしへん'], 6, [null, 'hen']),
    '175': /* 血 */ new Radical(['ち'], 6, [null]),
    '176': /* 行 */ new Radical(['ぎょうがまえ'], 6, ['gyougamae']),
    '177': /* 衣 */ new Radical(['ころも'], 6, [null]),
    '178': /* 西 */ new Radical(['にし'], 6, [null]),
    
    /* 7 strokes */
    '179': /* 臣 */ new Radical(['しん'], 7, [null]),
    '180': /* 見 */ new Radical(['みる'], 7, [null]),
    '181': /* 角 */ new Radical(['つの', 'つのへん'], 7, [null, 'hen']),
    '182': /* 言 */ new Radical(['げん', 'ごんべん'], 7, [null, 'hen']),
    '183': /* 谷 */ new Radical(['たに', 'たにへん'], 7, [null, 'hen']),
    '184': /* 豆 */ new Radical(['まめ', 'まめへん'], 7, [null, 'hen']),
    '185': /* 豕 */ new Radical(['いのこ'], 7, [null]),
    '186': /* 豸 */ new Radical(['むじなへん'], 7, ['hen']),
    '187': /* 貝 */ new Radical(['かい', 'かいへん'], 7, [null, 'hen']),
    '188': /* 赤 */ new Radical(['あか'], 7, [null]),
    '189': /* 走 */ new Radical(['はしる', 'そうにょう'], 7, [null, 'nyou']),
    '190': /* 足 */ new Radical(['あし', 'あしへん'], 7, [null, 'hen']),
    '191': /* 身 */ new Radical(['み', 'みへん'], 7, [null, 'hen']),
    '192': /* 車 */ new Radical(['くるま', 'くるまへん'], 7, [null, 'hen']),
    '193': /* 辛 */ new Radical(['からい'], 7, [null]),
    '194': /* 辰 */ new Radical(['しんのたつ'], 7, [null]),
    '195': /* 酉 */ new Radical(['ひよみのとり', 'とりへん'], 7, [null, 'hen']),
    '196': /* 釆 */ new Radical(['のごめ', 'のごめへん'], 7, [null, 'hen']),
    '197': /* 里 */ new Radical(['さと', 'さとへん'], 7, [null, 'hen']),
    '198': /* 舛 */ new Radical(['まいあし'], 7, [null]),
    '199': /* 麦 */ new Radical(['むぎ'], 7, [null]),
    
    /* 8 strokes */
    '200': /* 金 */ new Radical(['かね', 'かねへん'], 8, [null, 'hen']),
    '201': /* 長 */ new Radical(['ながい'], 8, [null]),
    '202': /* 門 */ new Radical(['もんがまえ'], 8, ['mongamae']),
    '203': /* 隶 */ new Radical(['れいづくり'], 8, ['tsukuri']),
    '204': /* 隹 */ new Radical(['ふるとり'], 8, [null]),
    '205': /* 雨 */ new Radical(['あめ', 'あめかんむり'], 8, [null, 'kanmuri']),
    '206': /* 青 */ new Radical(['あお'], 8, [null]),
    '207': /* 非 */ new Radical(['あらず'], 8, [null]),
    /* Missing 208 to 210 */
    '211': /* 斉 */ new Radical(['せい'], 8, [null]),
    
    /* 9 strokes */
    '212': /* 面 */ new Radical(['めん'], 9, [null]),
    '213': /* 革 */ new Radical(['つくりがわ'], 9, [null]),
    '214': /* 韭 */ new Radical(['にら'], 9, [null]),
    '215': /* 音 */ new Radical(['おと'], 9, [null]),
    '216': /* 頁 */ new Radical(['おおがい'], 9, ['tsukuri']),
    '217': /* 風 */ new Radical(['かぜ'], 9, [null]),
    '218': /* 飛 */ new Radical(['とぶ'], 9, [null]),
    '219': /* 食 */ new Radical(['しょく', 'しょくへん'], 9, [null, 'hen']),
    '220': /* 首 */ new Radical(['くび'], 9, [null]),
    '221': /* 香 */ new Radical(['かおり'], 9, [null]),
    /* Missing 222 */
    
    /* 10 strokes */
    '223': /* 馬 */ new Radical(['うま', 'うまへん'], 10, [null, 'hen']),
    '224': /* 骨 */ new Radical(['ほね', 'ほねへん'], 10, [null, 'hen']),
    '225': /* 高 */ new Radical(['たかい'], 10, [null]),
    '226': /* 髟 */ new Radical(['かみかんむり'], 10, ['kanmuri']),
    '227': /* 鬥 */ new Radical(['たたかいがまえ'], 10, ['mongamae']),
    '228': /* 鬯 */ new Radical(['においざけ'], 10, [null]),
    '229': /* 鬲 */ new Radical(['れき'], 10, [null]),
    '230': /* 鬼 */ new Radical(['おに'], 10, [null]),
    /* Missing 231 */
    '232': /* 韋 */ new Radical(['なめしがわ'], 10, [null]),
    
    /* 11 strokes */
    '233': /* 魚 */ new Radical(['うお', 'うおへん'], 11, [null, 'hen']),
    '234': /* 鳥 */ new Radical(['とり'], 11, [null]),
    '235': /* 鹵 */ new Radical(['しお'], 11, [null]),
    '236': /* 鹿 */ new Radical(['しか'], 11, [null]),
    '237': /* 麻 */ new Radical(['あさ', 'あさかんむり'], 11, [null, 'kanmuri']),
    '238': /* 亀 */ new Radical(['かめ'], 11, [null]),
    /* Missing 239 */
    '240': /* 黄 */ new Radical(['き'], 11, [null]),
    '241': /* 黒 */ new Radical(['くろ'], 11, [null]),
    
    /* 12 strokes */
    '242': /* 黍 */ new Radical(['き'], 12, [null]),
    '243': /* 黹 */ new Radical(['ぬいとり'], 12, [null]),
    /* Missing 244  */
    '245': /* 歯 */ new Radical(['は'], 12, [null]),
    
    /* 13 strokes */
    '246': /* 黽 */ new Radical(['かえる'], 13, [null]),
    '247': /* 鼎 */ new Radical(['かなえ'], 13, [null]),
    '248': /* 鼓 */ new Radical(['つづみ'], 13, [null]),
    '249': /* 鼠 */ new Radical(['ねずみ'], 13, [null]),
    
    /* 14 strokes */
    '250': /* 鼻 */ new Radical(['はな'], 14, [null]),
    '251': /* 齊 */ new Radical(['せい'], 14, [null]),
    
    /* 17 strokes */
    '252': /* 龠 */ new Radical(['やく'], 17, [null]),
}

var synonymReadingsBuilt = false;

/*
    Creates katakana and romaji readings for the radicals.
    This is called when a search through the radicals is necessary,
    since such search is almost never necessary the code is left in this
    function to alleviate page load time.
*/
function BuildRadicalsSynonymReadings() {
    if(synonymReadingsBuilt) {
        return;
    }
    
    for(radicalId in RadicalTable) {
        var radical = RadicalTable[radicalId];
        var originalReadingsCount = radical.readings.length;
        
        for(var i = 0; i < originalReadingsCount; i++) {
            var hiragana = radical.readings[i];
            var katakana = ConvertHiraganaToKatakana(hiragana);
            radical.readings.push(katakana);
            
            var romaji = GetRomajiForHiragana(hiragana)
            radical.readings.push(romaji);
        }
    }
    
    synonymReadingsBuilt = true;
}
