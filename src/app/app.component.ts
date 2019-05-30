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
    // �u���E�U�̌���ݒ�擾
    const browserLanguage: string = (() => {
      if (navigator.languages.length > 0) {
        return navigator.languages[0];
      }
      
      //�f�t�H���g
      return "en-US";
    })();
   
   // ����ݒ�
   this.translate.use(browserLanguage);
  }
}
