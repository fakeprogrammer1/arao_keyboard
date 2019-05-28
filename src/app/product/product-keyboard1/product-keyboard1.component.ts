import { Component, OnInit } from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { KeyboardCommonStrings } from '../../shared/models/product-Keyboard-Common';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-keyboard1',
  templateUrl: './product-keyboard1.component.html',
  styleUrls: ['./product-keyboard1.component.scss']
})
export class ProductKeyboard1Component implements OnInit {
  keyboardCommon:KeyboardCommon;
  keyboardCommonStrings:KeyboardCommonStrings;
  //matDialogModule:MatDialogModule;
  private index: number;
  private tmpstr:string;
  private tmplengthsize: number; 
  private tmpcodenum: number;
  currentKeyboard: number;
  modal = null;
  subscription: Subscription;
  
  constructor(
    private productKeyboardCommonService: ProductKeyboardCommonService,
    private modalService: ModalService)
   {
   }

  ngOnInit() {
    this.keyboardCommonStrings = new KeyboardCommonStrings();
    this.currentKeyboard = 0;
    this.keyboardCommon = this.productKeyboardCommonService.dataInit();
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
  
  //////
    /**
  * @brief MELCOキーボードに表示する文字列を*1文字*追加する *MELCOキーボード内での１文字
  * @param addstring(in) 追加する１文字
  * @return -
  * @detail 文字数オーバーの場合、モーダル画面表示
  */
  addCharactor(addstring: string): void{
    // 最大文字数超えていないか判定
    this.tmpstr = this.keyboardCommon.inputstring + addstring;
    console.log(this.tmpstr);
    if (this.LengthCheck() <= this.productKeyboardCommonService.keyboardTypeInfoList[this.productKeyboardCommonService.keyboardType].maxLength) {  //最大文字列を超えている場合は現在の文字列をエラーを応答
      // 文字列に追加
      this.keyboardCommon.inputstring = this.tmpstr;
    }
    else{
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
    var delNum = this.keyboardCommon.countLastCharChunk(this.keyboardCommon.inputstring.slice(-3));

    // 文字列から指定文字数分を削除
    this.keyboardCommon.inputstring = this.keyboardCommon.inputstring.slice(0, -delNum);
  }

  /**
  * @brief MELCOキーボードに表示する文字列をすべて削除する
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  delAllString():void{
    // 配列を初期化
    this.keyboardCommon.inputstring = ''; 
  }

    /**
  * @brief MELCOキーボードで入力した文字列を保存する
  * @param -
  * @return -
  * @detail 文字数オーバー
  */
  save():void{
    this.keyboardCommon.inputstring = this.keyboardCommon.deleteTrailSpaces();
    if(this.productKeyboardCommonService.keyboardType == 8 && this.keyboardCommon.inputstring.length == 0){
        //TODO デフォルトの名前を設定するか確認するダイアログ
        confirm("デフォルトの名称を使用します\nよろしいですか？");
    }
    this.keyboardCommon.saveInputData(this.productKeyboardCommonService.keyboardType);
  }

  /**
  * @brief MELCOキーボードの種別を設定
  * @param currentKeyboard(in) キーボード種別
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
  setCurrentKeyboard(currentKeyboard: number): void{
    this.currentKeyboard = currentKeyboard;
  }

 /**
  * @brief MELCOキーボード上での文字列の長さを計算する
  * @param -
  * @return -
  * @detail 半角文字：1文字、全角文字：2文字で計算する
  */
  private LengthCheck(): number{
    this.tmplengthsize = 0;
    for (this.index = 0; this.index < this.tmpstr.length; this.index++){
      this.tmpcodenum = this.tmpstr.charCodeAt(this.index);
      if ((this.tmpcodenum >= 0x0 && this.tmpcodenum < 0x81) || (this.tmpcodenum === 0xf8f0) || (this.tmpcodenum >= 0xff61 && this.tmpcodenum < 0xffa0) || (this.tmpcodenum >= 0xf8f1 && this.tmpcodenum < 0xf8f4))
        this.tmplengthsize += 1;
      else 
        this.tmplengthsize += 2;
    }
    return (this.tmplengthsize);
  }
}