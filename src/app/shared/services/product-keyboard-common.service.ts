import { Injectable } from '@angular/core';
import { Observable, of  } from 'rxjs';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';

@Injectable({
  providedIn: 'root'
})
export class ProductKeyboardCommonService {
  private keyboardCommon;
  keyboardType: number;
  private index: number;
  private tmplengthsize: number; 
  private tmpcodenum: number;

  readonly keyboardTypeInfoList = [
    // keyboardTitle:キーボードに表示するタイトル、maxLength:入力文字列最大長
    {keyboardTitle:'ShopNameTitle', maxLength: 10},
    {keyboardTitle:'ServiceShopNameTitle',maxLength: 10},
    {keyboardTitle:'ServiceShopTelTitle',maxLength: 13},
    {keyboardTitle:'ShopTelTitle',maxLength: 13},
    {keyboardTitle:'SerialNumberTitle',maxLength: 15},
    {keyboardTitle:'ModelNumberTitle',maxLength: 30},
    {keyboardTitle:'ModelNumberTitle',maxLength: 25},
    {keyboardTitle:'RegisterNameTitle',maxLength: 16},
    {keyboardTitle:'BLEDeviceNameTitle',maxLength: 20}
  ];

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
    if((keyboardCommon.inputstring.length >= this.keyboardTypeInfoList[this.keyboardType].maxLength) || (this.LengthCheck(keyboardCommon.inputstring)  >= this.keyboardTypeInfoList[this.keyboardType].maxLength )){
      return(-1);
    }
    
    this.keyboardCommon = keyboardCommon;
    this.keyboardCommon.inputstring = this.keyboardCommon.getInputString(this.keyboardType);
    return (0);
  }

  /**
  * @brief MELCOキーボードに表示する情報の初期化
  * @param -
  * @return -
  * @detail 
  */
  dataInit(): KeyboardCommon{
    return (this.keyboardCommon);
  }

  /**
  * @brief MELCOキーボードの種別を設定
  * @param keyboardType(in) キーボード種別
  * @return -
  * @detail キーボードs種別は以下
  *         1:サービス店
  *         2:販売店
  *         3:販売店TEL
  *         4:製造No.
  *         5:型名情報(マルチ)
  *         6:型名情報(スリム)
  *         7:リモコン名称設定
  *         8:デバイス名称設定
  */
  setKeyboardType(keyboardType: number): void{
    this.keyboardType = keyboardType;
  }

   /**
  * @brief MELCOキーボードに表示する情報に変更が入った通知
  * @param -
  * @return -
  * @detail 
  */
  datachanged(): Observable<KeyboardCommon>{
    return of(this.keyboardCommon);
  }

  /**
  * @brief MELCOキーボード種別に変更が入った通知
  * @param -
  * @return -
  * @detail キーボード種別
  */
  keyboardTypechanged(): Observable<number>{
    return of(this.keyboardType);
  }

  /**
  * @brief MELCOキーボード上での文字列の長さを計算する
  * @param -
  * @return -
  * @detail 
  */
  private LengthCheck(tmpstr: string): number{
    this.tmplengthsize = 0;
    for (this.index = 0; this.index < tmpstr.length; this.index++){
      this.tmpcodenum = tmpstr.charCodeAt(this.index);
      if ((this.tmpcodenum >= 0x0 && this.tmpcodenum < 0x81) || (this.tmpcodenum === 0xf8f0) || (this.tmpcodenum >= 0xff61 && this.tmpcodenum < 0xffa0) || (this.tmpcodenum >= 0xf8f1 && this.tmpcodenum < 0xf8f4))
        // MELCOキーボードに表示される半角文字なら1文字
        this.tmplengthsize += 1;
      else 
        // MELCOキーボードに表示されない文字なら2文字
        this.tmplengthsize += 2;
      }
    return (this.tmplengthsize);
  }
  
}