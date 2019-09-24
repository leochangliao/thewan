import { Component, OnInit } from '@angular/core';
import { UtilityService, BookmarkAuth, DataUpdate, SecureData } from '../../../shared/utility.service';
import { AdminService } from './admin.content.setting';

@Component({
  selector: 'admin-content',
  templateUrl: './admin.content.component.html',
  styleUrls: ['./admin.content.component.scss']
})

export class AdminContentComponent implements OnInit {

  uiHandler = {
    tabs : AdminService.setting.tabs,
    activeTabIndex: 0,
    token: this.utilityService.token
  }

  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
    this.setActiveTab(this.uiHandler.tabs[0], 0);
  }

  resetTabs() {
    for(let tab of this.uiHandler.tabs) {
      tab.active = false;
    }
  }

  setActiveTab(tab:any, index) {
    this.resetTabs();
    tab.active = true;
    this.uiHandler.activeTabIndex = index;
    switch(index) {
      case 0:
        this.getPortfolio();
        break;
      case 1:
        this.getResume();
        break;
      case 2:
        this.getBookmark();
        break;
      case 3:
        this.getMessage();
        break;
    }
  }

  getPortfolio() {
    if(!this.uiHandler.tabs[0].data){
      this.uiHandler.tabs[0].isLoading = true;
      this.utilityService.getPortfolio().subscribe(resp =>{
        this.uiHandler.tabs[0].isLoading = false;
        this.uiHandler.tabs[0].data = resp || [];
      }, error => {
        this.uiHandler.tabs[0].isLoading = false;
      });
    }
  }
  getResume() {
    if(!this.uiHandler.tabs[1].data){
      this.uiHandler.tabs[1].isLoading = true;
      this.utilityService.getResume().subscribe(resp =>{
        this.uiHandler.tabs[1].isLoading = false;
        this.uiHandler.tabs[1].data = resp || [];
      }, error => {
        this.uiHandler.tabs[1].isLoading = false;
      });
    }
  }

  getBookmark() {
    if(!this.uiHandler.tabs[2].data && this.uiHandler.tabs[2].passcode) {
      let passcodeAuth:BookmarkAuth = {
        passcode: this.uiHandler.tabs[2].passcode
      }
      this.uiHandler.tabs[2].isLoading = true;
      this.utilityService.getBookmark(passcodeAuth).subscribe(resp =>{
        this.uiHandler.tabs[2].isLoading = false;
        this.uiHandler.tabs[2].data = resp || [];
      }, error => {
        this.uiHandler.tabs[2].isLoading = false;
      });
    }
  }

  getMessage() {
    if(!this.uiHandler.tabs[3].data){
      let payload:SecureData = {
        token: this.uiHandler.token,
        type: 'message'
      };
      this.uiHandler.tabs[3].isLoading = true;
      this.utilityService.getSecureData(payload).subscribe(resp =>{
        this.uiHandler.tabs[3].isLoading = false;
        this.uiHandler.tabs[3].data = resp || [];
      }, error => {
        this.uiHandler.tabs[3].isLoading = false;
      });
    }
  }

  updateData(tab:any) {
    let payload:DataUpdate = {
      token: this.uiHandler.token,
      type: tab.name,
      data: tab.data
    };

    if(payload.data && tab.name && payload.token) {
      tab.isSaving = true;
      this.utilityService.updateData(payload).subscribe(resp =>{
        tab.isSaving = false;
        tab.data = payload.data;
        this.utilityService.setCacheData(tab.name, payload.data);
        alert(tab.name.toUpperCase() + " - saved");
      }, error => {
        tab.isSaving = false;
        console.error('Api request failed:', payload);
        console.error('Please logout and login again.');
        console.error(error);
        alert("something wrong, please check console log");
      });
    } else {
      console.error('Invalid payload data:', payload);
      alert("Invalid Data, please check console log");
    }
  }

}
