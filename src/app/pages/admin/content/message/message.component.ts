import { Component, ViewChild, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { UtilityService } from '../../../../shared/utility.service';
import { ModalService } from '../../../../shared/modal/modalService';

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
    rawView: false
  };
  constructor(private utilityService:UtilityService, private modalService: ModalService) { }

  ngOnInit() {}

  toggleView(rawView:boolean) {
    if(this.textareaElm && this.textareaElm.nativeElement) {
      const _data = this.utilityService.parseJsonString(this.textareaElm.nativeElement.value);
      if(_data) {
        this.tab.data = _data;
      } else {
        this.modalService.alert('Data Error','json data error, previous data will be used in UI.');
      }
    }
    this.uiHandler.rawView = rawView;
  }

  setDelete(msg:any) {
    if(msg.delete) {
      delete msg.delete;
    } else {
      msg.delete = true;
    }
  }

  setRead(msg:any) {
    if(!msg.read) {
      msg.read = new Date().getTime();
      this.tab.silent = true;
      this.tab.counter.new--;
      this.save(this.tab, true);
    }
  }

  sanitizeData(tab:any) {
    // clean up data here
    let i = tab.data.length
    while (i--) {
      if (tab.data[i].delete) {
        tab.data.splice(i, 1);
      }
    }
  }

  save(tab:any, silent:boolean) {
    if(silent) {
      // used for:
      // - update read property
      this.onSave.emit(tab);
    } else {
      this.modalService.confirm('','').result.then((result) => {
        if(result) {
          this.sanitizeData(tab);
          tab.data = this.textareaElm ? this.utilityService.parseJsonString(this.textareaElm.nativeElement.value) : this.tab.data;
          this.onSave.emit(tab);
        }
      }, (reason) => {});
    }
  }
}
