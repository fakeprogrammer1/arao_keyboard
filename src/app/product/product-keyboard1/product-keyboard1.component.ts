import { Component, OnInit } from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { KeyboardCommonStrings } from '../../shared/models/product-Keyboard-Common';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';
import { Subscription } from 'rxjs';
//import { MatDialogModule } from '@angular/material';

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
    //this.matDialogModule = new MatDialogModule();
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
  * @return keyboardCommon(out) キーボード表示情報
  * @detail ErrorCode(-1) :文字数オーバー
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
  * @brief MELCOキーボードに表示する文字列をすべて削除する *MELCOキーボード内での１文字
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  delAllString():void{
    // 配列を初期化
    this.keyboardCommon.inputstring = ''; 
  }
  
  save():void{
    this.keyboardCommon.inputstring = this.keyboardCommon.deleteTrailSpaces();
    if(this.productKeyboardCommonService.keyboardType == 7 && this.keyboardCommon.inputstring.length == 0){
        //TODO デフォルトの名前を設定するか確認するダイアログ
        alert("TITLE：確認、MSG：デフォルトの名称を使用します\nよろしいですか？キャンセルOK");
    }
    this.keyboardCommon.saveInputData(this.productKeyboardCommonService.keyboardType);
  }
  
  // キーボード切り替え
  setCurrentKeyboard(currentKeyboard: number): void{
    this.currentKeyboard = currentKeyboard;
  }

  // 文字列をByteに変換
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