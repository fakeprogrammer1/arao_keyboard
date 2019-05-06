import { Component, OnInit } from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { KeyboardCommonStrings } from '../../shared/models/product-Keyboard-Common';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';
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
  currentKeyboard: number;

  constructor(
    private productKeyboardCommonService: ProductKeyboardCommonService)
   {
   }

  ngOnInit() {
    this.keyboardCommon = new KeyboardCommon();
    this.keyboardCommonStrings = new KeyboardCommonStrings();
    //this.matDialogModule = new MatDialogModule();
    this.currentKeyboard = 0;
  }

  ngDoCheck(){
    this.keyboardCommon = this.productKeyboardCommonService.dataExport();
  }

  // 一文字追加
  addCharactor(addstring: string): void{
    this.keyboardCommon = this.productKeyboardCommonService.addCharactor(addstring);
      if(this.keyboardCommon.errorcode != 0){
      //TODO エラー用のモーダルダイアログ作成
      console.log(" お知らせ");
      console.log("  制限文字数を超えています");
      console.log("  [OK]");
      }
  }

  // 一文字削除
  delCharactor(): void{
    this.keyboardCommon = this.productKeyboardCommonService.delCharactor();
    if(this.keyboardCommon.errorcode != 0){
      //TODO エラー処理記載
    }
  }

  // 全文字削除
  delAllString():void{
    this.keyboardCommon = this.productKeyboardCommonService.delAllString();
    if(this.keyboardCommon.errorcode != 0){
      //TODO エラー処理記載
    }
  }
  
  // キーボード切り替え
  setCurrentKeyboard(currentKeyboard: number): void{
    this.currentKeyboard = currentKeyboard;
  }
}
