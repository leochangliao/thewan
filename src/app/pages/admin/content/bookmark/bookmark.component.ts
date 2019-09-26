import { Component, ViewChild, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { UtilityService } from '../../../../shared/utility.service';

@Component({
  selector: 'admin-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})

export class AdminBookmarkComponent implements OnInit {

  @ViewChild('textareaElm',{static: false}) textareaElm: ElementRef;
  @Input() tab:any;
  @Output() onSave = new EventEmitter();
  uiHandler = {
    rawView: true
  }
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {}

  toggleView(rawView:boolean) {
    this.uiHandler.rawView = rawView;
  }

  save(tab:any) {
    tab.data = this.utilityService.parseJsonString(this.textareaElm.nativeElement.value);
    this.onSave.emit(tab);
  }
}
