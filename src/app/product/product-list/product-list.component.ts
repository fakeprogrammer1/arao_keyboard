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

  ngOnInit() { }

  //TODO: この辺はライブラリ検討時に再考
  goKeyboard(){
    // 実装例：Storageから読み出し
    // 実装例：KeyBoardパターンを設定(T.B.D)
    this.keyboardCommon.keyboardpattern = 0;
    this.productKeyboardCommonService.dataImport(this.keyboardCommon);
  }

  saveButton(){
    this.keyboardCommon = this.productKeyboardCommonService.dataExport();
    // 実装例：Storageに保存する処理
  }
}
