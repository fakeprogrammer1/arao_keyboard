
/*! @class  KeyboardCommon
    @brief  キーボードに表示する情報を管理する。
    例：「会議室南1234」を入力した場合
        inputsize = {3,1,1,1,1,1}
        inputstring = "会議室南1234"
*/
export class KeyboardCommon {
    inputsizes: number[];       //文字数リスト
    inputstring: string;        //表示文字列
    errorcode: number;          //errorcode ０:正常
  
    constructor() {
        this.inputsizes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.inputstring = '';
        this.errorcode = 0;
    }
}

/*! @class  KeyboardCommonStrings
    @brief  キーボードに表示する文字列のリストを保持する
*/
  // TODO: このクラスはSharedにある必要ないのでいずれProductに移管。 
  export class KeyboardCommonStrings {
    // TODO:deletestrings以外は要素追加 二次元配列にする
    readonly keyboardstrings = ['CustomKeyboardKanaTitle','CustomKeyboardAlphabetCapitalTitle','CustomKeyboardAlphabetTitle','CustomKeyboardNumberTitle','CustomKeyboardTempleteTitle'];
    readonly kanaLists = ['ｱ','ｲ','ｳ','ｴ','ｵ'];     //ｶﾅ文字列
    readonly alphabetCapitalLists = ['A','B','C','D','E']; //英字(大)文字列
    readonly alphabetLists = ['a','b','c','d','e']; //英字(小)文字列
    readonly numberLists = ['1','2','3','4','5'];  //数字文字列
    readonly charsLists = ['会議室','通路','窓'];  //予約語文字列

    constructor() {
    }
}
  
     
