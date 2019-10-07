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
    isLoading: false,
    tabs : AdminService.setting.tabs,
    activeTab: 'portfolio',
    token: this.utilityService.token,
    isDemo: this.utilityService.token === 'demo'
  }

  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
    this.setActiveTab(this.uiHandler.tabs[0]);
  }

  getTab(name:string) {
    for(let tab of this.uiHandler.tabs) {
      if(tab.name === name) {
        return tab;
      }
    }
    return {};
  }

  resetTabs() {
    for(let tab of this.uiHandler.tabs) {
      tab.active = false;
    }
  }

  setActiveTab(tab:any) {
    this.resetTabs();
    tab.active = true;
    this.uiHandler.activeTab = tab.name;
    switch(tab.name) {
      case 'portfolio':
        this.getPortfolio(tab);
        break;
      case 'resume':
        this.getResume(tab);
        break;
      case 'bookmark':
        this.getBookmark(tab);
        break;
      case 'message':
        this.getMessage(tab);
        break;
    }
  }

  getPortfolio(tab:any) {
    if(!tab.data){
      this.uiHandler.isLoading = true;
      this.utilityService.getPortfolio().subscribe(resp =>{
        this.uiHandler.isLoading = false;
        tab.data = resp || [];
      }, error => {
        this.uiHandler.isLoading = false;
      });
    }
  }
  getResume(tab:any) {
    if(!tab.data){
      this.uiHandler.isLoading = true;
      this.utilityService.getResume().subscribe(resp =>{
        this.uiHandler.isLoading = false;
        tab.data = resp || [];
      }, error => {
        this.uiHandler.isLoading = false;
      });
    }
  }

  getBookmark(tab:any, reload:boolean=false) {
    if(!tab.data || reload) {
      if(this.uiHandler.isDemo) {
        let passcodeAuth:BookmarkAuth = {
          passcode: '9999'
        }
        this.uiHandler.isLoading = true;
        this.utilityService.getBookmark(passcodeAuth).subscribe(resp =>{
          this.uiHandler.isLoading = false;
          tab.data = resp || [];
        }, error => {
          this.uiHandler.isLoading = false;
        });
      } else {
        this.getSecureData(tab, 'bookmark');
      }
    }

  }

  getMessage(tab:any) {
    if(!tab.data) {
      this.getSecureData(tab, 'message');
    }
  }

  getSecureData(tab:any, type:string) {
    let payload:SecureData = {
      token: this.uiHandler.token,
      type: type
    };
    this.uiHandler.isLoading = true;
    this.utilityService.getSecureData(payload).subscribe(resp =>{
      this.uiHandler.isLoading = false;
      tab.data = resp || [];
    }, error => {
      this.uiHandler.isLoading = false;
    });
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
