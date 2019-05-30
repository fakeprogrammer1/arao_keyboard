import { Component} from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
/*! @class  ProductListComponent
    @brief  MELCOキーボードの切替を管理する
*/
export class ProductListComponent{
  keyboardType: number = 0;

  constructor(private productKeyboardCommonService: ProductKeyboardCommonService,
              private keyboardCommon: KeyboardCommon) {
  }

  /**
   * @brief キーボード種別を設定する
   * @param num(in) キーボード種別
   * @return -
   * @detail 
   */
  goKeyboard(num: number): void{
    // キーボードタイプを設定
    this.productKeyboardCommonService.setKeyboardType(num);
    this.keyboardType = num;

    //以下BLE通信用変換テスト用コード
    //this.getInputArray();
  }

  /**
   * @brief テスト用関数
   * @param -
   * @return -
   * @detail 入力された文字列をBLE通信用コードに変換しalertで表示する。
   */
  getInputArray(){
    alert(this.productKeyboardCommonService.convertBLEArray(this.keyboardCommon.getSaveInputString(this.keyboardType)));
  }

}