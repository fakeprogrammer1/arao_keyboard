import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-keyboard1',
  templateUrl: './product-keyboard1.component.html',
  styleUrls: ['./product-keyboard1.component.scss']
})
/*! @class  ProductKeyboard1Component
    @brief  キーボードに表示する情報を管理する
*/
export class ProductKeyboard1Component implements OnInit, OnDestroy {
  keyboardCommonStrings:KeyboardCommonStrings = new KeyboardCommonStrings();
  currentKeyboard: number = 0;
  modal = null;
  subscription: Subscription;
  
  constructor(
    private productKeyboardCommonService: ProductKeyboardCommonService,
    private modalService: ModalService,
    private keyboardCommon:KeyboardCommon,
    private translateService: TranslateService)
   {
   }

  ngOnInit() {
    // 前回入力された情報を入力中文字列として設定
    if(this.isMaxMELCOKeyboardString() == false){
      this.keyboardCommon.setInputString(this.keyboardCommon.getSaveInputString(this.productKeyboardCommonService.keyboardType));
    }else{
      // 入力しようとした文字列がキーボード既定の最大値を超える場合は空を設定
      this.keyboardCommon.setInputString('');
    }
    // モーダルダイアログを閉じる際のイベント処理
    this.subscription = this.modalService.closeEventObservable.subscribe(
      () => {
        this.modal = null;
      }
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * @brief MELCOキーボードの入力文字列数が最大数を超えていないか判定する
   * @param -
   * @return 成功: ture
   *         失敗: false
   * @detail 
   */
  isMaxMELCOKeyboardString(): Boolean{
    // 各キーボードに設定される最大文字数を超えていないか判定
    if( this.countMELCOString(this.keyboardCommon.getInputString()) >= this.keyboardCommonStrings.keyboardTypeInfoList[this.productKeyboardCommonService.keyboardType].maxLength ){
      return true;
    }else{
      return false;
    }
  }
  /**
   * @brief MELCOキーボードに表示する文字列を*1文字*追加する *MELCOキーボード内での１文字
   * @param addstring(in) 追加する文字
   * @return -
   * @detail 規定文字数を超えている場合、モーダル画面表示
   */
  addCharactor(addstring: string): void{
    var tmpstr = this.keyboardCommon.getInputString() + addstring;

    // 最大文字数超えていないか判定
    if (this.isMaxMELCOKeyboardString() == false) {  
      // 文字列に追加
      this.keyboardCommon.setInputString(tmpstr);
    }else{
      // 規定文字数超えの場合のモーダル画面表示
      this.modal = ModalComponent;
    }
  }

  /**
   * @brief MELCOキーボードに表示する文字列を*1文字*削除する *MELCOキーボード内での１文字
   * @param -
   * @return keyboardCommon(out) キーボード表示情報
   * @detail 
   */
  delCharactor(): void{
    // 削除する文字数を取得
    var delNum = this.productKeyboardCommonService.countLastCharChunk(this.keyboardCommon.getInputString());

    // 文字列から指定文字数分を削除
    this.keyboardCommon.setInputString(this.keyboardCommon.getInputString().slice(0, -delNum));
  }

  /**
   * @brief MELCOキーボードに表示する文字列をすべて削除する
   * @param -
   * @return -
   * @detail 
   */
  delAllString():void{
    this.keyboardCommon.setInputString(''); 
  }

  /**
   * @brief MELCOキーボードで入力した文字列を保存する
   * @param -
   * @return -
   * @detail 文字数オーバー
   */
  save():void{
    // 入力された文字列の末尾を削除
    this.keyboardCommon.setInputString(this.deleteTrailSpaces(this.keyboardCommon.getInputString()));

    if(this.productKeyboardCommonService.keyboardType == 8 && this.keyboardCommon.getInputString().length == 0){
      //TODO デフォルトの名前を設定するか確認するダイアログ
      confirm(this.translateService.instant('CustomKeyboardUseDefaultBleDeviceName'));
    }
    this.keyboardCommon.setSaveInputString(this.productKeyboardCommonService.keyboardType);
  }

  /**
   * @brief MELCOキーボードの番号を設定
   * @param currentKeyboard(in) キーボード番号
   * @return -
   * @detail カナ/ABC/123/固定文字等を変更
   */
  setCurrentKeyboard(currentKeyboard: number): void{
    this.currentKeyboard = currentKeyboard;
  }

  /**
   * @brief 文字列の末尾の空白を削除
   * @param str(in) 末尾の空白を削除する文字列
   * @return str(out) 末尾の空白を削除した文字列
   * @detail 
   */
  deleteTrailSpaces(str:string): string{
    var i;
    for(i = str.length; i > 0; i--){
      if(str.slice(i-1,i) != ' '){
        break;
      }
    }
    return str.slice(0,i);
  }
  /**
   * @brief MELCOキーボード上での文字列の長さを計算する
   * @param str(in) 計算する文字列
   * @return number(out) MELCOキーボード上での文字列の長さ
   * @detail 半角文字：1文字、全角文字：2文字で計算する
   */
  countMELCOString(tmpstr: string): number{
    var tmplengthsize = 0;
    var tmpcodenum = 0;
    for (var index = 0; index < tmpstr.length; index++){
      tmpcodenum = tmpstr.charCodeAt(index);
      if ((tmpcodenum >= 0x0 && tmpcodenum < 0x81) || (tmpcodenum === 0xf8f0) || (tmpcodenum >= 0xff61 && tmpcodenum < 0xffa0) || (tmpcodenum >= 0xf8f1 && tmpcodenum < 0xf8f4)){
        tmplengthsize += 1;
      }else{ 
        tmplengthsize += 2;
      }
    }
    return (tmplengthsize);
  }
}

/*! @class  KeyboardCommonStrings
    @brief  キーボードに表示する文字列のリストを保持する
*/
export class KeyboardCommonStrings {
  readonly keyboardstrings = ['CustomKeyboardKanaTitle',            // ｶﾅ
                              'CustomKeyboardAlphabetCapitalTitle', // ABC
                              'CustomKeyboardAlphabetTitle',        // abc
                              'CustomKeyboardNumberTitle',          // 123
                              'CustomKeyboardTempleteTitle'];       // 固定文字
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
  
  // キーボードの表示文字列
  readonly keyboard = [[this.kanaLists, this.alphabetCapitalLists1,this.numberLists1],// サービス店
                       [this.kanaLists, this.alphabetCapitalLists1,this.numberLists1],// 販売店
                       [this.numberLists2],// 販売店TEL
                       [this.numberLists2],// サービス店TEL
                       [this.alphabetCapitalLists2,this.numberLists1],// 製造No.
                       [this.alphabetCapitalLists2,this.numberLists1],// 型名情報(マルチ)
                       [this.alphabetCapitalLists2,this.numberLists1],// 型名情報(スリム)
                       [this.kanaLists,this.alphabetCapitalLists1,this.numberLists1,this.charsLists], // リモコン名称設定
                       [this.alphabetCapitalLists3,this.alphabetLists,this.numberLists1]]; //デバイス名称設定
  
  // キーボードの表示文字列切替部
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

  readonly keyboardTypeInfoList = [
      // keyboardTitle:キーボードに表示するタイトル、maxLength:入力文字列最大長
      {keyboardTitle:'ShopNameTitle', maxLength: 10,keyboardPattern:this.keyboardPattern[0],keyboardStr:this.keyboard[0]},       // サービス店
      {keyboardTitle:'ServiceShopNameTitle',maxLength: 10,keyboardPattern:this.keyboardPattern[1],keyboardStr:this.keyboard[1]}, // 販売店
      {keyboardTitle:'ServiceShopTelTitle',maxLength: 13,keyboardPattern:this.keyboardPattern[2],keyboardStr:this.keyboard[2]},  // 販売店TEL
      {keyboardTitle:'ShopTelTitle',maxLength: 13,keyboardPattern:this.keyboardPattern[3],keyboardStr:this.keyboard[3]},         // サービス店TEL
      {keyboardTitle:'SerialNumberTitle',maxLength: 15,keyboardPattern:this.keyboardPattern[4],keyboardStr:this.keyboard[4]},    // 製造No.
      {keyboardTitle:'ModelNumberTitle',maxLength: 30,keyboardPattern:this.keyboardPattern[5],keyboardStr:this.keyboard[5]},     // 型名情報(マルチ)
      {keyboardTitle:'ModelNumberTitle',maxLength: 25,keyboardPattern:this.keyboardPattern[6],keyboardStr:this.keyboard[6]},     // 型名情報(スリム)
      {keyboardTitle:'RegisterNameTitle',maxLength: 16,keyboardPattern:this.keyboardPattern[7],keyboardStr:this.keyboard[7]},    // リモコン名称設定
      {keyboardTitle:'BLEDeviceNameTitle',maxLength: 20,keyboardPattern:this.keyboardPattern[8],keyboardStr:this.keyboard[8]}    //デバイス名称設定
    ];

}