
/*! @class  KeyboardCommon
    @brief  キーボードに表示する情報を管理する。
    例：「会議室南1234」を入力した場合
        inputsize = {3,1,1,1,1,1}
        inputstring = "会議室南1234"
*/
export class KeyboardCommon {
    inputstring: string;        //表示文字列
    errorcode: number;          //errorcode ０:正常
    private saveInputString: any[9] = ['','','','','','','','',''];
    list2 = ['通路','部屋','廊下','空調','換気'];
    list3 = ['会議室','事務所','打合せ'];
    bleArray =[' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
               '0','1','2','3','4','5','6','7','8','9','-','/','(',')','.',',','゛','゜',
               'ｱ','ｲ','ｳ','ｴ','ｵ','ｶ','ｷ','ｸ','ｹ','ｺ','ｻ','ｼ','ｽ','ｾ','ｿ','ﾀ','ﾁ','ﾂ','ﾃ','ﾄ','ﾅ','ﾆ','ﾇ','ﾈ','ﾉ','ﾊ','ﾋ','ﾌ','ﾍ','ﾎ','ﾏ','ﾐ','ﾑ','ﾒ','ﾓ','ﾔ','ﾕ','ﾖ','ﾗ','ﾘ','ﾙ','ﾚ','ﾛ','ﾜ','ｦ','ﾝ',
               'ｧ','ｨ','ｩ','ｪ','ｫ','ｬ','ｭ','ｮ','ｯ',
               '会議室','事務所','打合せ','通路','部屋','廊下','空調','換気','東','西','南','北','側','窓','前','横','課','部','室',
               'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
               '!','"','#','$','%','&','\'','*','+',':',';','<','=','>','?','[','\\',']','^','_','`','{','|','}','~'
               ];
               
    constructor() {
        this.inputstring = '';
        this.errorcode = 0;
    }
    
    // 末尾の空白を削除
    deleteTrailSpaces(){
        var i;
        for(i = this.inputstring.length; i > 0; i--){
            if(this.inputstring.slice(i-1,i) != ' '){
                break;
            }
        }
        return this.inputstring.slice(0,i);
    }
    //保存
    saveInputData(num){
        this.saveInputString[num] = this.inputstring;
    }
    
    // 取得
    getInputString(num){
        return this.saveInputString[num];
    }
    //TODO BLE通信変換
    convertBLEArray(str: string){
        var convertData = [];

        for(var i=0; i<str.length;){
            var charNum = this.countNextCharChunk(str.slice(i));
            var char = this.bleArray.indexOf(str.slice(i,i+charNum));
            if(char == -1){
                // キーボードで入力される文字以外が入っている
                return -1;
            }else{
                convertData.push(char);
                i+=charNum;
            }
        }
        
        return convertData;
    }

     countNextCharChunk(str: string){
         var str3 = str.slice(0,3)
         if(this.list3.indexOf(str3) >= 0){
             return 3;
         }
         
         var str2 = str.slice(0,2)
         if(this.list2.indexOf(str2) >= 0){
             return 2;
         }
         
         return 1;
     }
     
     countLastCharChunk(str: string){
         var str3 = str.slice(-3);
         if(this.list3.indexOf(str3) >= 0){
             return 3;
         }
         
         var str2 = str.slice(-2);
         if(this.list2.indexOf(str2) >= 0){
             return 2;
         }
         
         return 1;
     }

}

/*! @class  KeyboardCommonStrings
    @brief  キーボードに表示する文字列のリストを保持する
*/
  // TODO: このクラスはSharedにある必要ないのでいずれProductに移管。 
  export class KeyboardCommonStrings {
    // TODO:deletestrings以外は要素追加 二次元配列にする
    readonly keyboardstrings = ['CustomKeyboardKanaTitle','CustomKeyboardAlphabetCapitalTitle','CustomKeyboardAlphabetTitle','CustomKeyboardNumberTitle','CustomKeyboardTempleteTitle'];
    readonly kanaLists = ['ｱ','ｲ','ｳ','ｴ','ｵ',
                          'ｶ','ｷ','ｸ','ｹ','ｺ',
                          'ｻ','ｼ','ｽ','ｾ','ｿ',
                          'ﾀ','ﾁ','ﾂ','ﾃ','ﾄ',
                          'ﾅ','ﾆ','ﾇ','ﾈ','ﾉ',
                          'ﾊ','ﾋ','ﾌ','ﾍ','ﾎ',
                          'ﾏ','ﾐ','ﾑ','ﾒ','ﾓ',
                          'ﾔ','ﾕ','ﾖ','ﾞ','ﾟ',
                          'ﾗ','ﾘ','ﾙ','ﾚ','ﾛ',
                          'ﾜ','ｦ','ﾝ','.',',',
                          'ｧ','ｨ','ｩ','ｪ','ｫ',
                          'ｬ','ｭ','ｮ','ｯ',' ',];
    readonly alphabetCapitalLists = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    readonly alphabetCapitalLists1 = this.alphabetCapitalLists.concat(['-','/','(',')']);
    readonly alphabetCapitalLists2 = this.alphabetCapitalLists.concat([' ','-']);
    readonly alphabetCapitalLists3 = this.alphabetCapitalLists.concat(['-','/','(',')','!','"','#','$','%','&','\'','*','+',':',';','<','=','>','?','[','\\',']','^','_','`','{','|','}',' ']);
    readonly alphabetLists = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    readonly numberLists1 = ['1','2','3','4','5','6','7','8','9','0'];
    readonly numberLists2 = this.numberLists1.concat(['-',' ']);
    readonly charsLists = ['会議室','通路','窓','東','西','南','北','側','事務所','部屋','前','打合せ','廊下','横','空調','換気','室','課','部'];
    
    readonly keyboard = [[this.kanaLists, this.alphabetCapitalLists1,this.numberLists1],// サービス店
                         [this.kanaLists, this.alphabetCapitalLists1,this.numberLists1],// 販売店
                         [this.numberLists2],// 販売店TEL
                         [this.numberLists2],// サービス店TEL
                         [this.alphabetCapitalLists2,this.numberLists1],// 製造No.
                         [this.alphabetCapitalLists2,this.numberLists1],// 型名情報(マルチ)
                         [this.alphabetCapitalLists2,this.numberLists1],// 型名情報(スリム)
                         [this.kanaLists,this.alphabetCapitalLists1,this.numberLists1,this.charsLists], // リモコン名称設定
                         [this.alphabetCapitalLists3,this.alphabetLists,this.numberLists1]]; //デバイス名称設定
                         
    readonly keyboardPattern = 
                           [[this.keyboardstrings[0],this.keyboardstrings[1],this.keyboardstrings[3]], // サービス店
                           [this.keyboardstrings[0],this.keyboardstrings[1],this.keyboardstrings[3]], // 販売店
                           [/*何もなし*/], // 販売店TEL
                           [/*何もなし*/], // サービス店TEL
                           [this.keyboardstrings[1],this.keyboardstrings[3]], // 製造No.
                           [this.keyboardstrings[1],this.keyboardstrings[3]], // 型名情報(マルチ)
                           [this.keyboardstrings[1],this.keyboardstrings[3]], // 型名情報(スリム)
                           [this.keyboardstrings[0],this.keyboardstrings[1],this.keyboardstrings[3],this.keyboardstrings[4]], // リモコン名称設定
                           [this.keyboardstrings[1],this.keyboardstrings[2],this.keyboardstrings[3]]]; //デバイス名称設定
                           
    constructor() {
    }
}
  
     
