import { Component} from '@angular/core';
import { KeyboardCommon } from '../../shared/models/product-Keyboard-Common';
import { KeyboardCommonStrings } from '../../shared/models/product-Keyboard-Common';
import { ProductKeyboardCommonService } from '../../shared/services/product-keyboard-common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent{
  keyboardCommonStrings:KeyboardCommonStrings;
  sd = saveData.getInstance();
  //s; //テスト用変数
  constructor(private productKeyboardCommonService: ProductKeyboardCommonService) {
  }


  //TODO: この辺はライブラリ検討時に再考
  goKeyboard(num: number){
    // 実装例：Storageから読み出し
    // キーボードタイプを設定
    this.productKeyboardCommonService.setKeyboardType(num);
    this.productKeyboardCommonService.dataImport(this.sd.keyboardCommon); 
    
    // 以下BLE通信テスト用コード
    //this.s = this.sd.keyboardCommon.convertBLEArray("A0");
    //alert(this.s);
    
  }

}

class saveData {
  private static _instance: saveData;
  public keyboardCommon:KeyboardCommon = new KeyboardCommon();

  public static getInstance():saveData {
    if (!this._instance){
      this._instance = new saveData();
    }
    
    return this._instance;
  }
  
}