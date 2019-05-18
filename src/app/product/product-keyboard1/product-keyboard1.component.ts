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
    this.keyboardCommon = new KeyboardCommon();
    this.keyboardCommonStrings = new KeyboardCommonStrings();
    //this.matDialogModule = new MatDialogModule();
    this.currentKeyboard = 0;
    // モーダルダイアログを閉じる際のイベント処理
    this.subscription = this.modalService.closeEventObservable.subscribe(
      () => {
        this.modal = null;
      }
    );
    // MELCOキーボードに変更が入ったときの処理
    this.productKeyboardCommonService.datachanged().subscribe((keyboardCommon: KeyboardCommon) => {
        this.keyboardCommon = keyboardCommon;
      }
    );
  }

  ngDoCheck(){
    this.keyboardCommon = this.productKeyboardCommonService.dataExport();
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
    if (this.LengthCheck() <= this.keyboardCommon.MAX_SIZE) {  //最大文字列を超えている場合は現在の文字列をエラーを応答
      // 文字列に追加
      this.keyboardCommon.inputstring = this.tmpstr;
      // 文字数リストを更新
      for (this.index = 0; this.keyboardCommon.inputsizes[this.index] != 0; this.index++);
      this.keyboardCommon.inputsizes[this.index] = addstring.length; 
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
    for (this.index = 0; this.keyboardCommon.inputsizes[this.index] != 0 && this.index < this.keyboardCommon.inputsizes.length; this.index++);

    // 文字列から指定文字数分を削除
    this.keyboardCommon.inputstring = this.keyboardCommon.inputstring.slice(0, -this.keyboardCommon.inputsizes[this.index - 1]);

    // 文字数リストを更新
    this.keyboardCommon.inputsizes[this.index-1] = 0;
  }

  /**
  * @brief MELCOキーボードに表示する文字列をすべて削除する *MELCOキーボード内での１文字
  * @param -
  * @return keyboardCommon(out) キーボード表示情報
  * @detail 
  */
  delAllString():void{
    // 配列を初期化
    this.keyboardCommon.inputsizes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];;
    this.keyboardCommon.inputstring = ''; 
  }
  
  // キーボード切り替え
  setCurrentKeyboard(currentKeyboard: number): void{
    this.currentKeyboard = currentKeyboard;
  }

  // 最大値を超えていないかチェックする関数
  private LengthCheck(): number{
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
    return (this.tmplengthsize);
  }

}
