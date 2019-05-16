import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // �C�x���g�ʒm���s�����߂̃I�u�W�F�N�g
  private closeEventSubject = new Subject<string>();

  // �C�x���g�ʒm���󂯎�邽�߂̃I�u�W�F�N�g
  public closeEventObservable = this.closeEventSubject.asObservable();

  constructor() { }

  public requestCloseModal() {
    // ���[�_���_�C�A���O�����
    this.closeEventSubject.next();
  }
}