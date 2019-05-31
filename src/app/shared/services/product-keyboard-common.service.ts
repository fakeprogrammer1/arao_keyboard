import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*! @class  ProductKeyboardCommonService
    @brief  MELCOキーボードの種別を管理する
*/
export class ProductKeyboardCommonService {
  keyboardType: number;
  private twoChunklist = ['通路','部屋','廊下','空調','換気'];
  private threeChunklist = ['会議室','事務所','打合せ'];
  
  /**
   * @brief MELCOキーボードの種別を設定
   * @param keyboardType(in) キーボード種別
   * @return -
   * @detail キーボード種別は以下
   *         1:サービス店
   *         2:販売店
   *         3:サービス店TEL
   *         4:販売店TEL
   *         5:製造No.
   *         6:型名情報(マルチ)
   *         7:型名情報(スリム)
   *         8:リモコン名称設定
   *         9:デバイス名称設定
   */
  setKeyboardType(keyboardType: number): void{
    this.keyboardType = keyboardType;
  }

  /**
   * @brief BLE通信用コードに文字列を変換する
   * @param str(in) BLE通信用コードに変換する文字列
   * @return number(out) 成功：BLE通信用コード
   *                     失敗：null
   * @detail 
   */
  convertBLEArray(str: string): number[]{
    var convertData = [];
    var bleArray =[' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '0','1','2','3','4','5','6','7','8','9','-','/','(',')','.',',','゛','゜',
    'ｱ','ｲ','ｳ','ｴ','ｵ','ｶ','ｷ','ｸ','ｹ','ｺ','ｻ','ｼ','ｽ','ｾ','ｿ','ﾀ','ﾁ','ﾂ','ﾃ','ﾄ','ﾅ','ﾆ','ﾇ','ﾈ','ﾉ','ﾊ','ﾋ','ﾌ','ﾍ','ﾎ','ﾏ','ﾐ','ﾑ','ﾒ','ﾓ','ﾔ','ﾕ','ﾖ','ﾗ','ﾘ','ﾙ','ﾚ','ﾛ','ﾜ','ｦ','ﾝ',
    'ｧ','ｨ','ｩ','ｪ','ｫ','ｬ','ｭ','ｮ','ｯ',
    '会議室','事務所','打合せ','通路','部屋','廊下','空調','換気','東','西','南','北','側','窓','前','横','課','部','室',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    '!','"','#','$','%','&','\'','*','+',':',';','<','=','>','?','[','\\',']','^','_','`','{','|','}','~'
    ];

    for(var i=0; i<str.length;){
        var charNum = this.countNextCharChunk(str.slice(i));　// MELCOキーボード上の文字の塊数を取得
        var char = bleArray.indexOf(str.slice(i,i+charNum));　// MELCOキーボード上の文字の塊を取得

        if(char == -1){
            // キーボードで入力される文字以外が入っている
            return null;
        }else{
            convertData.push(char);
            i+=charNum;
        }
    }
    
    return convertData;
  }

  /**
   * @brief MELCOキーボードにおける文字列の塊を判定
   * @param str(in) 判定する文字列
   * @return number(out) 文字の塊数を返却
   * @detail MELCOキーボードに含まれない文字数の場合は1を返却
   */
  countNextCharChunk(str: string): number{
    var str3 = str.slice(0,3)

    // 3文字チャンクのリストに含まれれば3を返却
    if(this.threeChunklist.indexOf(str3) >= 0){
      return 3;
    }
       
    // 2文字チャンクのリストに含まれれば2を返却
    var str2 = str.slice(0,2)
    if(this.twoChunklist.indexOf(str2) >= 0){
      return 2;
    }
       
    // 2文字チャンク、3文字チャンクのリスト両方に含まれない場合1を返却
    return 1;
  }

  /**
   * @brief MELCOキーボード上での文字列の長さを計算する
   * @param str(in) 判定する文字列
   * @return number(out)文字の塊数を返却
   * @detail MELCOキーボードに含まれない文字数の場合は1を返却
   */
  countLastCharChunk(str: string): number{
    var str3 = str.slice(-3);

    // 3文字チャンクのリストに含まれれば3を返却
    if(this.threeChunklist.indexOf(str3) >= 0){
      return 3;
    }

    // 2文字チャンクのリストに含まれれば2を返却
    var str2 = str.slice(-2);
       
    if(this.twoChunklist.indexOf(str2) >= 0){
      return 2;
    }

    // 2文字チャンク、3文字チャンクのリスト両方に含まれない場合1を返却
    return 1;
  }
}