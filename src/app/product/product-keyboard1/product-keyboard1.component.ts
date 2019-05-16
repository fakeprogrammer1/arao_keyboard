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
  }

  ngDoCheck(){
    this.keyboardCommon = this.productKeyboardCommonService.dataExport();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  // 一文字追加
  addCharactor(addstring: string): void{
    this.keyboardCommon = this.productKeyboardCommonService.addCharactor(addstring);
      if(this.keyboardCommon.errorcode != 0){
      // エラー用のモーダルダイアログ作成
      this.modal = ModalComponent;
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
