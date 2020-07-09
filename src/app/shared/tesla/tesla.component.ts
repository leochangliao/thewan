import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesla',
  templateUrl: './tesla.component.html',
  styleUrls: ['./tesla.component.scss']
})
export class TeslaComponent implements OnInit {

  public appVersion = "Under Construction, stay tuned!";
  public isActive:any = {
    'trans': false,
    'show': false
  };
  public showApp:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public start() {
    this.isActive.trans = true;
    this.isActive.show = true;
    window.document.body.style.overflow = "hidden";
    setTimeout(() => {
      this.showApp = true;
    },200);
  }

  public end() {    
    this.showApp = false;
    this.isActive.trans = false;
    window.document.body.style.overflow = "auto";
    setTimeout(() => {
      this.isActive.show = false;
    },1000);
  }
}
