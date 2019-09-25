import { Component, ViewChild, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { UtilityService } from '../../../../shared/utility.service';

@Component({
  selector: 'admin-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class AdminMessageComponent implements OnInit {

  @ViewChild('textareaElm',{static: false}) textareaElm: ElementRef;
  @Input() tab:any;
  @Output() onSave = new EventEmitter();
  uiHandler = {
    ui: false
  };
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {}

  save(tab:any) {
    tab.data = this.utilityService.parseJsonString(this.textareaElm.nativeElement.value);
    this.onSave.emit(tab);
  }

}
