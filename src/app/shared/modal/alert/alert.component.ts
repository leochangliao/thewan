import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertModal implements OnInit {
  @Input() title:string;
  @Input() message:string;
  constructor(public modal:NgbActiveModal) {}

  ngOnInit() {
  }

}
