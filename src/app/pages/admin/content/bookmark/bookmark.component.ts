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
    rawView: false,
    selectedGroup: {sites:[], id: null, title: null}
  }
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {}

  groupIsSelected(group:any) {
    return this.uiHandler.selectedGroup.id === group.id;
  }

  setSelected(group:any) {
    this.uiHandler.selectedGroup = group;
  }

  toggleView(rawView:boolean) {
    if(this.textareaElm && this.textareaElm.nativeElement) {
      // coming from rawView: update tab data and reset selected group
      this.tab.data = this.utilityService.parseJsonString(this.textareaElm.nativeElement.value);
      this.uiHandler.selectedGroup = {sites:[], id: null, title: null};
    }
    this.uiHandler.rawView = rawView;
  }

  save(tab:any) {
    tab.data = this.textareaElm ? this.utilityService.parseJsonString(this.textareaElm.nativeElement.value) : this.tab.data;
    this.onSave.emit(tab);
  }
}
