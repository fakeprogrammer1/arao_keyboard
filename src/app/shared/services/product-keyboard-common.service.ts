import { Injectable } from '@angular/core';
import { Observable, of  } from 'rxjs';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';

@Injectable({
  providedIn: 'root'
})
export class ProductKeyboardCommonService {
  private keyboardCommon = new KeyboardCommon();
  private index: number;
  private tmplengthsize: number; 
  private tmpcodenum: number;
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
    if((this.index >= this.keyboardCommon.MAX_SIZE) || (this.LengthCheck(keyboardCommon.inputstring)  >= this.keyboardCommon.MAX_SIZE )){
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
  * @brief MELCOキーボードに表示する情報の初期化
  * @param -
  * @return -
  * @detail 
  */
  dataInit(): KeyboardCommon{
    this.keyboardCommon.inputsizes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.keyboardCommon.inputstring = '';
    this.keyboardCommon.errorcode = 0;
    return (this.keyboardCommon);
  }

  /**
  * @brief MELCOキーボードに表示する情報に変更が入った通知
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  datachanged(): Observable<KeyboardCommon>{
    return of(this.keyboardCommon);
  }

  // 最大値を超えていないかチェックする関数
  private LengthCheck(tmpstr: string): number{
    this.tmplengthsize = 0;
    // 文字列をByteに変換し16Byte以内ならTrueを返す。
    for (this.index = 0; this.index < tmpstr.length; this.index++){
      this.tmpcodenum = tmpstr.charCodeAt(this.index);
      if ((this.tmpcodenum >= 0x0 && this.tmpcodenum < 0x81) || (this.tmpcodenum === 0xf8f0) || (this.tmpcodenum >= 0xff61 && this.tmpcodenum < 0xffa0) || (this.tmpcodenum >= 0xf8f1 && this.tmpcodenum < 0xf8f4))
        this.tmplengthsize += 1;
      else 
        this.tmplengthsize += 2;
      }
    console.log ('size = ' + this.tmplengthsize);
    console.log ('MAX = ' + this.keyboardCommon.MAX_SIZE);
    return (this.tmplengthsize);
  }
  
}