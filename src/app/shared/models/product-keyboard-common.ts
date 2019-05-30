
import { Injectable } from '@angular/core';

/*! @class  KeyboardCommon
    @brief  キーボードに表示する情報を管理する
*/
@Injectable({
    providedIn: 'root',
})
export class KeyboardCommon {
  private inputstring: string = '';        //表示文字列
  private saveInputString: any[9] = ['','','','','','','','',''];

  /**
   * @brief MELCOキーボードで入力した文字列を保存する
   * @param keyboardType(in) キーボード番号
   * @return -
   * @detail 
   */
  setSaveInputString(keyboardType: number): void{
    this.saveInputString[keyboardType] = this.inputstring;
  }
       
  /**
   * @brief MELCOキーボードで保存した文字列を返却する
   * @param keyboardType(in) キーボード番号
   * @return str(out) MELCOキーボードで保存した文字列
   * @detail 
   */
  getSaveInputString(keyboardType: number): string{
    return this.saveInputString[keyboardType];
  }

  /**
   * @brief MELCOキーボードに入力する文字列に設定する
   * @param str(in) MELCOキーボードに入力する文字列
   * @return -
   * @detail 
   */
  setInputString(str:string): void{
    this.inputstring = str;
  }

  /**
   * @brief MELCOキーボードで入力した文字列を返却する
   * @param -
   * @return str(out) MELCOキーボードで入力した文字列
   * @detail 
   */
  getInputString(): string{
    return this.inputstring;
  }
}