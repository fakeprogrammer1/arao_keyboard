import { Component} from '@angular/core';
import { Input } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(
    private modalService: ModalService
  ) { }

  public onClick() {
    // モーダルダイアログを閉じるリスクエスト通知
    this.modalService.requestCloseModal();
  }


}