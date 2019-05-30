import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keyboard';
  
  constructor(private translate: TranslateService){
    // ブラウザの言語設定取得
    const browserLanguage: string = (() => {
      if (navigator.languages.length > 0) {
        return navigator.languages[0];
      }
      
      //デフォルト
      return "en-US";
    })();
   
   // 言語設定
   this.translate.use(browserLanguage);
  }
}
