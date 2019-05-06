import { Injectable } from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';

@Injectable({
  providedIn: 'root'
})
export class ProductKeyboardCommonService {
  private keyboardCommon = new KeyboardCommon();
  private index: number;
  private tmpcodenum: number;
  private tmplengthsize: number;
  private tmpstr:string; 

  constructor() { 
  }

  /**
  * @brief MELCOキーボードに表示する情報のImport
  * @param keyboardCommon(in) キーボード表示情報
  * @return number 成功:0 失敗：0以外
  * @detail 共通部品ではStorageへのデータ保存を行わないため、保存データを読み込む場合は本関数を使用
  */
  dataImport(keyboardCommon: KeyboardCommon): number{
    //入力情報の判定処理
    for (this.index = 0; keyboardCommon.inputsizes[this.index] != 0; this.index++);
    if(this.index >= this.keyboardCommon.MAX_SIZE || this.tmpstr.length >= this.keyboardCommon.MAX_SIZE){
      return(-1)
    }

    this.keyboardCommon = keyboardCommon;
    return (0);
  }

  /**
  * @brief MELCOキーボードに表示する情報のExport
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  dataExport(): KeyboardCommon{
    this.keyboardCommon.errorcode = 0;
    return (this.keyboardCommon);
  }

  /**
  * @brief MELCOキーボードに表示する文字列を*1文字*追加する *MELCOキーボード内での１文字
  * @param addstring(in) 追加する１文字
  * @return keyboardCommon(out) キーボード表示情報
  * @detail ErrorCode(-1) :文字数オーバー
  */
  addCharactor(addstring: string): KeyboardCommon{
    this.keyboardCommon.errorcode = 0;

    // 最大文字数超えていないか判定
    this.tmpstr = this.keyboardCommon.inputstring + addstring;
    console.log(this.tmpstr);
    if (this.maxLengthCheck() ==true) {  //最大文字列を超えている場合は現在の文字列をエラーを応答
      // 文字列に追加
      this.keyboardCommon.inputstring = this.tmpstr;
      // 文字数リストを更新
      for (this.index = 0; this.keyboardCommon.inputsizes[this.index] != 0; this.index++);
      this.keyboardCommon.inputsizes[this.index] = addstring.length; 
    }
    else{
      this.keyboardCommon.errorcode = -1;
    }
    return (this.keyboardCommon);
  }
  /**
  * @brief MELCOキーボードに表示する文字列を*1文字*削除する *MELCOキーボード内での１文字
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  delCharactor(): KeyboardCommon{
    this.keyboardCommon.errorcode = 0;

    // 削除する文字数を取得
    for (this.index = 0; this.keyboardCommon.inputsizes[this.index] != 0; this.index++);

    // 文字列から指定文字数分を削除
    this.keyboardCommon.inputstring　= this.keyboardCommon.inputstring.slice(0, -this.keyboardCommon.inputsizes[this.index - 1]);

    // 文字数リストを更新
    this.keyboardCommon.inputsizes[this.index-1] = 0;

    return (this.keyboardCommon);
  }

  /**
  * @brief MELCOキーボードに表示する文字列をすべて削除する *MELCOキーボード内での１文字
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  delAllString(): KeyboardCommon{
    this.keyboardCommon.errorcode = 0;

    // 配列を初期化
    this.keyboardCommon.inputsizes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.keyboardCommon.inputstring = ''; 

    return (this.keyboardCommon);
  }

  // 最大値を超えていないかチェックする関数
  private maxLengthCheck(): boolean{
    this.tmplengthsize = 0;
    // 文字列をByteに変換し16Byte以内ならTrueを返す。
    for (this.index = 0; this.index < this.tmpstr.length; this.index++){
      this.tmpcodenum = this.tmpstr.charCodeAt(this.index);
      if ((this.tmpcodenum >= 0x0 && this.tmpcodenum < 0x81) || (this.tmpcodenum === 0xf8f0) || (this.tmpcodenum >= 0xff61 && this.tmpcodenum < 0xffa0) || (this.tmpcodenum >= 0xf8f1 && this.tmpcodenum < 0xf8f4))
        this.tmplengthsize += 1;
      else 
        this.tmplengthsize += 2;
      }
    console.log ('size = ' + this.tmplengthsize);
    console.log ('MAX = ' + this.keyboardCommon.MAX_SIZE);
    if(this.tmplengthsize <= this.keyboardCommon.MAX_SIZE)
      return (true);
    else
      return (false);
  }
}