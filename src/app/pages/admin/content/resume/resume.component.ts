import { Component, ViewChild, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { UtilityService } from '../../../../shared/utility.service';
import { ModalService } from '../../../../shared/modal/modalService';

@Component({
  selector: 'admin-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class AdminResumeComponent implements OnInit {

  @ViewChild('textareaElm',{static: false}) textareaElm: ElementRef;
  @Input() tab:any;
  @Output() onSave = new EventEmitter();
  uiHandler = {
    rawView: true
  };
  constructor(private utilityService:UtilityService, private modalService: ModalService) { }

  ngOnInit() {}

  toggleView(rawView:boolean) {
    this.uiHandler.rawView = rawView;
  }

  sanitizeData(tab:any) {
    // clean up data here
  }

  save(tab:any) {
    this.modalService.confirm('','').result.then((result) => {
      if(result) {
        this.sanitizeData(tab);
        tab.data = this.textareaElm ? this.utilityService.parseJsonString(this.textareaElm.nativeElement.value) : this.tab.data;
        this.onSave.emit(tab);
      }
    }, (reason) => {});
  }
}
