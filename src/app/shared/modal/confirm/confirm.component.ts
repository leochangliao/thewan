import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmModal implements OnInit {
  @Input() yesBtnText:string;
  constructor(public modal:NgbActiveModal) { }

  ngOnInit() {
    this.yesBtnText = this.yesBtnText || "Yes";
  }

}
