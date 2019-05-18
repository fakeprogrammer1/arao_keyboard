import { Component, OnInit } from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { KeyboardCommonStrings } from '../../shared/models/product-Keyboard-Common';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  keyboardCommon:KeyboardCommon;
  keyboardCommonStrings:KeyboardCommonStrings;

  constructor(private productKeyboardCommonService: ProductKeyboardCommonService) { }

  ngOnInit() {
    this.keyboardCommon = new KeyboardCommon();
   }

  //TODO: この辺はライブラリ検討時に再考
  goKeyboard(num: number){
    // 実装例：Storageから読み出し
    // キーボードタイプを設定
    this.productKeyboardCommonService.setKeyboardType(num);

    if(num == 0){
      this.keyboardCommon.inputsizes = [3,1,1,1,1,1,0];
      this.keyboardCommon.inputstring = '会議室南1234';
      // キーボード入力情報をImport
      this.productKeyboardCommonService.dataImport(this.keyboardCommon);  
    }else if(num == 1){
      // キーボード入力情報を初期化
      this.productKeyboardCommonService.dataInit();
    }else if(num == 2){
      // キーボード入力情報をExport
      this.keyboardCommon = this.productKeyboardCommonService.dataExport();
      console.log(this.keyboardCommon.inputstring);
      // キーボード入力情報をImport
      this.productKeyboardCommonService.dataImport(this.keyboardCommon);  
    }

  }

}
