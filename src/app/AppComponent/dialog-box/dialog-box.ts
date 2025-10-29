import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-box',
  imports: [],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css'
})
export class DialogBox {

  modal = inject(NgbActiveModal)

  confirm(){
    this.modal.close({event:"confirm"});
  }
}
