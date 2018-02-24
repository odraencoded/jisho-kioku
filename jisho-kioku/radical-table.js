/**
    This script includes data related to radicals.
    
    This list is incomplete, some radicals/readings might be missing.
**/

function Radical(jishoText, readings, strokes, positions) {
    this.jishoText = jishoText;
    this.jishoId = null;
    this.readings = readings;
    this.positions = positions;
    this.strokes = strokes;
}

/**
    Source: http://kanjialive.com/214-traditional-kanji-radicals/
**/
RadicalTable = {
    /* 1 stroke */
      '1': /* 一 */ new Radical('一', ['いち'], 1, [null]),
      '2': /* 丨 */ new Radical('丨', ['たてぼう'], 1, [null]),
      '3': /* 丶 */ new Radical('丶', ['てん'], 1, [null]),
      '4': /* 丿 */ new Radical('丿', ['の'], 1, [null]),
      '5': /* 乙 */ new Radical('乙', ['おつ'], 1, [null]),
      '6': /* 亅 */ new Radical('亅', ['はねぼう'], 1, [null]),
    
    /* 2 strokes */
      '7': /* 二 */ new Radical('二', ['に'], 2, [null]),
      '8': /* 亠 */ new Radical('亠', ['なべぶた'], 2, ['kanmuri']),
      '9': /* 人 */ new Radical('人', ['ひと'], 2, [null]),
     '10': /* ⺅ - 化 */ new Radical('⺅', ['にんべん'], 2, ['hen']),
     '11': /* 𠆢 - 个 */ new Radical('𠆢', ['ひとやね'], 2, ['kanmuri']),
     '12': /* 儿 */ new Radical('儿', ['ひとあし', 'にんにょう'], 2, ['ashi']),
     '13': /* 入 */ new Radical('入', ['いる'], 2, [null]),
     '14': /* ハ */ new Radical('ハ', ['はち'], 2, [null]),
     '15': /* 丷 - 半 */ new Radical('丷', ['はちがしら'], 2, [null]),
     '16': /* 冂 */ new Radical('冂', ['けいがまえ'], 2, ['keigamae']),
     '17': /* 冖 */ new Radical('冖', ['わかんむり'], 2, ['kanmuri']),
     '18': /* 冫 */ new Radical('冫', ['にすい'], 2, ['hen']),
     '19': /* 几 */ new Radical('几', ['きにょう', 'つくえ'], 2, ['tsukuri']),
     '20': /* 凵 */ new Radical('凵', ['かんにょう'], 2, ['nyou']),
     '21': /* 刀 */ new Radical('刀', ['かたな'], 2, [null]),
     '22': /* ⺉ - 刈 */ new Radical('⺉', ['りっとう'], 2, ['tsukuri']),
     '23': /* 力 */ new Radical('力', ['ちから'], 2, [null]),
     '24': /* 勹 */ new Radical('勹', ['つつみがまえ'], 2, ['tsutsumigamae']),
     '25': /* 匕 */ new Radical('匕', ['さじ'], 2, ['tsukuri']),
     '26': /* 匚 */ new Radical('匚', ['はこがまえ'], 2, ['hakogamae']),
     '27': /* 十 */ new Radical('十', ['じゅう'], 2, [null]),
     '28': /* 卜 */ new Radical('卜', ['ぼく'], 2, [null]),
     '29': /* 卩 */ new Radical('卩', ['ふしづくり'], 2, ['tsukuri']),
     '30': /* 厂 */ new Radical('厂', ['がんだれ'], 2, ['tare']),
     '31': /* 厶 */ new Radical('厶', ['む'], 2, [null]),
     '32': /* 又 */ new Radical('又', ['また'], 2, [null]),
    /* Missing 33 to 36 */
    /* 3 strokes */
    
     '37': /* ⻌ */ new Radical('⻌', ['しんにょう'], 3, ['nyou']),
     '38': /* 口 */ new Radical('口', ['くち'], 3, [null]),
     '39': /* 囗 */ new Radical('囗', ['くにがまえ'], 3, ['kunigamae']),
     '40': /* 土 */ new Radical('土', ['つち'], 3, [null]),
     '41': /* 士 */ new Radical('士', ['さむらい', 'さむらいかんむり'], 3, [null, 'kanmuri']),
     '42': /* 夂 */ new Radical('夂', ['のまた'], 3, [null]),
     '43': /* 夕 */ new Radical('夕', ['ゆうべ'], 3, [null]),
     '44': /* 大 */ new Radical('大', ['だい'], 3, [null]),
     '45': /* 女 */ new Radical('女', ['おんな', 'おんなへん'], 3, [null, 'hen']),
     '46': /* 子 */ new Radical('子', ['こ', 'こへん'], 3, [null, 'hen']),
     '47': /* 宀 */ new Radical('宀', ['うかんむり'], 3, ['kanmuri']),
     '48': /* 寸 */ new Radical('寸', ['すん', 'すんづくり'], 3, [null, 'tsukuri']),
     '49': /* 小 */ new Radical('小', ['しょう', 'ちいさい'], 3, [null]),
     '50': /* ⺌ */ new Radical('⺌', ['しょうかんむり'], 3, ['kanmuri']),
     '51': /* 尢 */ new Radical('尢', ['だいのまげあし', 'まげあし'], 3, ['tsukuri']),
     '52': /* 尸 */ new Radical('尸', ['しかばね'], 3, ['tare']),
     '53': /* 屮 */ new Radical('屮', ['くさのめ'], 3, [null]),
     '54': /* 山 */ new Radical('山', ['やま', 'やまへん'], 3, [null, 'hen']),
     '55': /* 川 */ new Radical('川', ['さんぼんがわ'], 3, [null]),
     '56': /* 巛 */ new Radical('巛', ['まがりがわ'], 3, [null]),
     '57': /* 工 */ new Radical('工', ['たくみ', 'たくみへん'], 3, [null, 'hen']),
     '58': /* 已 */ new Radical('已', ['おのれ'], 3, [null]),
     '59': /* 巾 */ new Radical('巾', ['はば', 'はばへん'], 3, [null, 'hen']),
     '60': /* 干 */ new Radical('干', ['かん'], 3, [null]),
     '61': /* 幺 */ new Radical('幺', ['いとがしら'], 3, [null]),
     '62': /* 广 */ new Radical('广', ['まだれ'], 3, ['tare']),
     '63': /* 廴 */ new Radical('廴', ['えんにょう'], 3, ['nyou']),
     '64': /* 廾 */ new Radical('廾', ['にじゅうあし'], 3, ['ashi']),
     '65': /* 弋 */ new Radical('弋', ['いぐるみ'], 3, [null]),
     '66': /* 弓 */ new Radical('弓', ['ゆみ', 'ゆみへん'], 3, [null, 'hen']),
     '67': /* ヨ */ new Radical('ヨ', ['けいがしら'], 3, [null]),
     '68': /* 彑 */ new Radical('彑', ['けいがしら'], 3, [null]),
     '69': /* 彡 */ new Radical('彡', ['さんづくり'], 3, ['tsukuri']),
     '70': /* 彳 */ new Radical('彳', ['ぎょうにんべん'], 3, ['hen']),
     '71': /* ⺖ - 忙 */ new Radical('⺖', ['りっしんべん'], 3, ['hen']),
     '72': /* ⺘ - 扎 */ new Radical('⺘', ['てへん'], 3, ['hen']),
     '73': /* ⺡ - 氾 */ new Radical('⺡', ['さんずい'], 3, ['hen']),
     '74': /* ⺨ - 氾 */ new Radical('⺨', ['けものへん'], 3, ['hen']),
     '75': /* ⺾ */ new Radical('⺾', ['くさかんむり'], 3, ['kanmuri']),
     '76': /* ⻏ */ new Radical('⻏', ['おおざと'], 3, ['tsukuri']),
     '77': /* ⻖ */ new Radical('⻖', ['こざとへん'], 3, ['hen']),
    /* Missing 78 to 81 */
    /* 4 strokes */
    
     '82': /* ⺹ - 考 */ new Radical('⺹', ['おいかんむり'], 4, ['kanmuri']),
     '83': /* 心 */ new Radical('心', ['こころ'], 4, [null]),
     '84': /* 戈 */ new Radical('戈', ['ほこ'], 4, [null]),
     '85': /* 戸 */ new Radical('戸', ['と', 'とだれ'], 4, [null, 'tare']),
     '86': /* 手 */ new Radical('手', ['て'], 4, [null]),
     '87': /* 支 */ new Radical('支', ['しにょう'], 4, [null]),
     '88': /* 攵 */ new Radical('攵', ['ぼくづくり'], 4, ['tsukuri']),
     '89': /* 文 */ new Radical('文', ['ぶん'], 4, [null]),
     '90': /* 斗 */ new Radical('斗', ['ますづくり'], 4, ['tsukuri']),
     '91': /* 斤 */ new Radical('斤', ['おのづくり'], 4, ['tsukuri']),
     '92': /* 方 */ new Radical('方', ['ほう', 'ほうへん'], 4, [null, 'hen']),
     '93': /* 无 */ new Radical('无', ['むうにょう'], 4, [null]),
     '94': /* 日 */ new Radical('日', ['ひ', 'ひへん'], 4, [null, 'hen']),
     '95': /* 曰 */ new Radical('曰', ['ひらび'], 4, [null]),
     '96': /* 月 */ new Radical('月', ['つき', 'つきへん'], 4, [null, 'hen']),
     '97': /* 木 */ new Radical('木', ['き', 'きへん'], 4, [null, 'hen']),
     '98': /* 欠 */ new Radical('欠', ['あくび'], 4, [null]),
     '99': /* 止 */ new Radical('止', ['とめる'], 4, [null]),
    '100': /* 歹 */ new Radical('歹', ['がつ', 'がつへん'], 4, [null, 'hen']),
    '101': /* 殳 */ new Radical('殳', ['るまた'], 4, ['tsukuri']),
    '102': /* 比 */ new Radical('比', ['くらべる'], 4, [null]),
    '103': /* 毛 */ new Radical('毛', ['け'], 4, [null]),
    '104': /* 氏 */ new Radical('氏', ['うじ'], 4, [null]),
    '105': /* 气 */ new Radical('气', ['きがまえ'], 4, ['kigamae']),
    '106': /* 水 */ new Radical('水', ['みず'], 4, [null]),
    '107': /* 火 */ new Radical('火', ['ひ', 'ひへん'], 4, [null, 'hen']),
    '108': /* 杰 */ new Radical('⺣', ['れっか'], 4, ['ashi']),
    '109': /* 爪 */ new Radical('爪', ['つめ', 'つめかんむり'], 4, [null, 'kanmuri']),
    
    '110': /* 父 */ new Radical('父', ['ちち'], 4, [null]),
    '111': /* 爻 */ new Radical('爻', ['こう'], 4, [null]),
    '112': /* 爿 */ new Radical('爿', ['しょうへん'], 4, ['hen']),
    '113': /* 片 */ new Radical('片', ['かた', 'かたへん'], 4, [null, 'hen']),
    '114': /* 牛 */ new Radical('牛', ['うし', 'うしへん'], 4, [null, 'hen']),
    '115': /* 犬 */ new Radical('犬', ['いぬ'], 4, [null]),
    '116': /* ⺭ - 礼 */ new Radical('⺭', ['しめすへん'], 4, ['hen']),
    '117': /* 王 */ new Radical('王', ['おう', 'おうへん'], 4, [null, 'hen']),
    /* Missing 118 to 124 */
    '125': /* 毋 */ new Radical('毋', ['なかれ'], 4, [null]),
    
    /* 5 strokes */
    '126': /* 玄 */ new Radical('玄', ['げん'], 5, [null]),
    '127': /* 瓦 */ new Radical('瓦', ['かわら'], 5, [null]),
    '128': /* 甘 */ new Radical('甘', ['あまい'], 5, [null]),
    '129': /* 生 */ new Radical('生', ['うまれる'], 5, [null]),
    '130': /* 用 */ new Radical('用', ['もちいる'], 5, [null]),
    '131': /* 田 */ new Radical('田', ['た', 'たへん'], 5, [null, 'hen']),
    '132': /* 疋 */ new Radical('疋', ['ひき', 'ひきへん'], 5, [null, 'hen']),
    '133': /* 疒 */ new Radical('疒', ['やまいだれ'], 5, ['tare']),
    '134': /* 癶 */ new Radical('癶', ['はつがしら'], 5, ['kanmuri']),
    '135': /* 白 */ new Radical('白', ['しろ', 'はくへん'], 5, [null, 'hen']),
    '136': /* 皮 */ new Radical('皮', ['けがわ'], 5, [null]),
    '137': /* 皿 */ new Radical('皿', ['さら'], 5, [null]),
    '138': /* 目 */ new Radical('目', ['め', 'めへん'], 5, [null, 'hen']),
    '139': /* 矛 */ new Radical('矛', ['ほこ', 'ほこへん'], 5, [null, 'hen']),
    '140': /* 矢 */ new Radical('矢', ['や', 'やへん'], 5, [null, 'hen']),
    '141': /* 石 */ new Radical('石', ['いし', 'いしへん'], 5, [null, 'hen']),
    '142': /* 示 */ new Radical('示', ['しめす'], 5, [null]),
    '143': /* 禸 */ new Radical('禸', ['じゅうのあし'], 5, [null]),
    '144': /* 禾 */ new Radical('禾', ['のぎへん'], 5, ['hen']),
    '145': /* 穴 */ new Radical('穴', ['あな'], 5, [null]),
    '146': /* 立 */ new Radical('立', ['たつ', 'たつへん'], 5, [null, 'hen']),
    '147': /* ⻂ - 初 */ new Radical('⻂', ['ころもへん'], 5, ['hen']),
    /* Missing 148 to 151 */
    '152': /* ⺲ - 罒 */ new Radical('⺲', ['あみがしら', 'よこめ'], 5, ['kanmuri']),
    '153': /* 牙 */ new Radical('牙', ['きば', 'きばへん'], 5, [null, 'hen']),
    
    /* 6 Strokes */
    '154': /* 瓜 */ new Radical('瓜', ['うり'], 6, [null]),
    '155': /* 竹 */ new Radical('竹', ['たけ', 'たけかんむり'], 6, [null, 'kanmuri']),
    '156': /* 米 */ new Radical('米', ['こめ', 'こめへん'], 6, [null, 'hen']),
    '157': /* 糸 */ new Radical('糸', ['いと', 'いとへん'], 6, [null, 'hen']),
    '158': /* 缶 */ new Radical('缶', ['みずがめ'], 6, [null]),
    '159': /* 羊 */ new Radical('羊', ['ひつじ'], 6, [null]),
    '160': /* 羽 */ new Radical('羽', ['はね'], 6, [null]),
    '161': /* 而 */ new Radical('而', ['しこうして'], 6, [null]),
    '162': /* 耒 */ new Radical('耒', ['らいすき'], 6, ['hen']),
    '163': /* 耳 */ new Radical('耳', ['みみ', 'みみへん'], 6, [null, 'hen']),
    '164': /* 聿 */ new Radical('聿', ['ふでづくり'], 6, [null]),
    '165': /* 肉 */ new Radical('肉', ['にく'], 6, [null]),
    '166': /* 自 */ new Radical('自', ['みずから'], 6, [null]),
    '167': /* 至 */ new Radical('至', ['いたる', 'いたるへん'], 6, [null, 'hen']),
    '168': /* 臼 */ new Radical('臼', ['うす'], 6, [null]),
    '169': /* 舌 */ new Radical('舌', ['した'], 6, [null]),
    '170': /* 舟 */ new Radical('舟', ['ふね', 'ふねへん'], 6, [null, 'hen']),
    '171': /* 艮 */ new Radical('艮', ['こん'], 6, [null]),
    '172': /* 色 */ new Radical('色', ['いろ'], 6, [null]),
    '173': /* 虍 */ new Radical('虍', ['とらがしら'], 6, ['kanmuri']),
    '174': /* 虫 */ new Radical('虫', ['むし', 'むしへん'], 6, [null, 'hen']),
    '175': /* 血 */ new Radical('血', ['ち'], 6, [null]),
    '176': /* 行 */ new Radical('行', ['ぎょうがまえ'], 6, ['gyougamae']),
    '177': /* 衣 */ new Radical('衣', ['ころも'], 6, [null]),
    '178': /* 西 */ new Radical('西', ['にし'], 6, [null]),
    
    /* 7 strokes */
    '179': /* 臣 */ new Radical('臣', ['しん'], 7, [null]),
    '180': /* 見 */ new Radical('見', ['みる'], 7, [null]),
    '181': /* 角 */ new Radical('角', ['つの', 'つのへん'], 7, [null, 'hen']),
    '182': /* 言 */ new Radical('言', ['げん', 'ごんべん'], 7, [null, 'hen']),
    '183': /* 谷 */ new Radical('谷', ['たに', 'たにへん'], 7, [null, 'hen']),
    '184': /* 豆 */ new Radical('豆', ['まめ', 'まめへん'], 7, [null, 'hen']),
    '185': /* 豕 */ new Radical('豕', ['いのこ'], 7, [null]),
    '186': /* 豸 */ new Radical('豸', ['むじなへん'], 7, ['hen']),
    '187': /* 貝 */ new Radical('貝', ['かい', 'かいへん'], 7, [null, 'hen']),
    '188': /* 赤 */ new Radical('赤', ['あか'], 7, [null]),
    '189': /* 走 */ new Radical('走', ['はしる', 'そうにょう'], 7, [null, 'nyou']),
    '190': /* 足 */ new Radical('足', ['あし', 'あしへん'], 7, [null, 'hen']),
    '191': /* 身 */ new Radical('身', ['み', 'みへん'], 7, [null, 'hen']),
    '192': /* 車 */ new Radical('車', ['くるま', 'くるまへん'], 7, [null, 'hen']),
    '193': /* 辛 */ new Radical('辛', ['からい'], 7, [null]),
    '194': /* 辰 */ new Radical('辰', ['しんのたつ'], 7, [null]),
    '195': /* 酉 */ new Radical('酉', ['ひよみのとり', 'とりへん'], 7, [null, 'hen']),
    '196': /* 釆 */ new Radical('釆', ['のごめ', 'のごめへん'], 7, [null, 'hen']),
    '197': /* 里 */ new Radical('里', ['さと', 'さとへん'], 7, [null, 'hen']),
    '198': /* 舛 */ new Radical('舛', ['まいあし'], 7, [null]),
    '199': /* 麦 */ new Radical('麦', ['むぎ'], 7, [null]),
    
    /* 8 strokes */
    '200': /* 金 */ new Radical('金', ['かね', 'かねへん'], 8, [null, 'hen']),
    '201': /* 長 */ new Radical('長', ['ながい'], 8, [null]),
    '202': /* 門 */ new Radical('門', ['もんがまえ'], 8, ['mongamae']),
    '203': /* 隶 */ new Radical('隶', ['れいづくり'], 8, ['tsukuri']),
    '204': /* 隹 */ new Radical('隹', ['ふるとり'], 8, [null]),
    '205': /* 雨 */ new Radical('雨', ['あめ', 'あめかんむり'], 8, [null, 'kanmuri']),
    '206': /* 青 */ new Radical('青', ['あお'], 8, [null]),
    '207': /* 非 */ new Radical('非', ['あらず'], 8, [null]),
    /* Missing 208 to 210 */
    '211': /* 斉 */ new Radical('斉', ['せい'], 8, [null]),
    
    /* 9 strokes */
    '212': /* 面 */ new Radical('面', ['めん'], 9, [null]),
    '213': /* 革 */ new Radical('革', ['つくりがわ'], 9, [null]),
    '214': /* 韭 */ new Radical('韭', ['にら'], 9, [null]),
    '215': /* 音 */ new Radical('音', ['おと'], 9, [null]),
    '216': /* 頁 */ new Radical('頁', ['おおがい'], 9, ['tsukuri']),
    '217': /* 風 */ new Radical('風', ['かぜ'], 9, [null]),
    '218': /* 飛 */ new Radical('飛', ['とぶ'], 9, [null]),
    '219': /* 食 */ new Radical('食', ['しょく', 'しょくへん'], 9, [null, 'hen']),
    '220': /* 首 */ new Radical('首', ['くび'], 9, [null]),
    '221': /* 香 */ new Radical('香', ['かおり'], 9, [null]),
    /* Missing 222 */
    
    /* 10 strokes */
    '223': /* 馬 */ new Radical('馬', ['うま', 'うまへん'], 10, [null, 'hen']),
    '224': /* 骨 */ new Radical('骨', ['ほね', 'ほねへん'], 10, [null, 'hen']),
    '225': /* 高 */ new Radical('高', ['たかい'], 10, [null]),
    '226': /* 髟 */ new Radical('髟', ['かみかんむり'], 10, ['kanmuri']),
    '227': /* 鬥 */ new Radical('鬥', ['たたかいがまえ'], 10, ['mongamae']),
    '228': /* 鬯 */ new Radical('鬯', ['においざけ'], 10, [null]),
    '229': /* 鬲 */ new Radical('鬲', ['れき'], 10, [null]),
    '230': /* 鬼 */ new Radical('鬼', ['おに'], 10, [null]),
    /* Missing 231 */
    '232': /* 韋 */ new Radical('韋', ['なめしがわ'], 10, [null]),
    
    /* 11 strokes */
    '233': /* 魚 */ new Radical('魚', ['うお', 'うおへん'], 11, [null, 'hen']),
    '234': /* 鳥 */ new Radical('鳥', ['とり'], 11, [null]),
    '235': /* 鹵 */ new Radical('鹵', ['しお'], 11, [null]),
    '236': /* 鹿 */ new Radical('鹿', ['しか'], 11, [null]),
    '237': /* 麻 */ new Radical('麻', ['あさ', 'あさかんむり'], 11, [null, 'kanmuri']),
    '238': /* 亀 */ new Radical('亀', ['かめ'], 11, [null]),
    /* Missing 239 */
    '240': /* 黄 */ new Radical('黄', ['き'], 11, [null]),
    '241': /* 黒 */ new Radical('黒', ['くろ'], 11, [null]),
    
    /* 12 strokes */
    '242': /* 黍 */ new Radical('黍', ['き'], 12, [null]),
    '243': /* 黹 */ new Radical('黹', ['ぬいとり'], 12, [null]),
    /* Missing 244  */
    '245': /* 歯 */ new Radical('歯', ['は'], 12, [null]),
    
    /* 13 strokes */
    '246': /* 黽 */ new Radical('黽', ['かえる'], 13, [null]),
    '247': /* 鼎 */ new Radical('鼎', ['かなえ'], 13, [null]),
    '248': /* 鼓 */ new Radical('鼓', ['つづみ'], 13, [null]),
    '249': /* 鼠 */ new Radical('鼠', ['ねずみ'], 13, [null]),
    
    /* 14 strokes */
    '250': /* 鼻 */ new Radical('鼻', ['はな'], 14, [null]),
    '251': /* 齊 */ new Radical('齊', ['せい'], 14, [null]),
    
    /* 17 strokes */
    '252': /* 龠 */ new Radical('龠', ['やく'], 17, [null]),
}

RadicalMap = {};

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
        
        RadicalMap[radical.jishoText] = radical;
        radical.jishoId = radicalId
    }
    
    synonymReadingsBuilt = true;
}
