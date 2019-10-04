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
  };
  openUpload = false;
  currentBookMark = {icon:{}};
  originalData = [];
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
    this.originalData = this.tab.data;
  }

  resetSelected(newid:string=null) {
    this.uiHandler.selectedGroup = {sites:[], id: newid, title: newid};
  }

  groupIsSelected(group:any) {
    return this.uiHandler.selectedGroup.id === group.id;
  }

  setSelected(group:any) {
    this.uiHandler.selectedGroup = group;
  }

  toggleView(rawView:boolean) {
    if(this.textareaElm && this.textareaElm.nativeElement) {
      // coming from rawView: update tab data and reset selected group
      // fix: only update with valid json data
      const _data = this.utilityService.parseJsonString(this.textareaElm.nativeElement.value);
      if(_data) {
        this.tab.data = _data;
      } else {
        alert('json data error, old data will be loaded in UI.');
      }
      this.resetSelected(null);
    }
    this.uiHandler.rawView = rawView;
  }

  drop(e:any,data:any) {
    if(e.previousIndex !== e.currentIndex) {
      const _data = data[e.previousIndex];
      data[e.previousIndex] = data[e.currentIndex];
      data[e.currentIndex] = _data;
    }
  }

  // add new bookmark
  addBookmark() {
    const newSite = {
      id: 's' + Math.floor(Date.now() / 1000),
      url: "http://",
      name: "NewSite",
      icon: "images/icon/0_httpicon.png"
    }
    this.uiHandler.selectedGroup.sites.unshift(newSite);
  }

  // add new group
  add() {
    const newGroup = {
      id: Math.floor(Date.now() / 1000),
      title: "NewGroupName",
      sites: []
    }
    this.tab.data.unshift(newGroup);
    this.setSelected(this.tab.data[0]);
  }

  flagDeleteGroup(group:any) {
    group.delete = true;
  }

  setUndoDeleteGroup(group:any) {
    delete group.delete;
  }

  save(tab:any) {
    tab.data = this.textareaElm ? this.utilityService.parseJsonString(this.textareaElm.nativeElement.value) : this.tab.data;
    this.onSave.emit(tab);
  }

  toggleUpload(bookmark:any) {
    this.openUpload = true;
    this.currentBookMark = bookmark;
  }

  onCloseUpload() {
    this.openUpload = false;
  }

  onUploadFile(url:string) {
    this.currentBookMark.icon = {url:url};
  }
}
