import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // イベント通知を行うためのオブジェクト
  private closeEventSubject = new Subject<string>();

  // イベント通知を受け取るためのオブジェクト
  public closeEventObservable = this.closeEventSubject.asObservable();

  constructor() { }

  public requestCloseModal() {
    // モーダルダイアログを閉じる
    this.closeEventSubject.next();
  }
}