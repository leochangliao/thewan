import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesla',
  templateUrl: './tesla.component.html',
  styleUrls: ['./tesla.component.scss']
})
export class TeslaComponent implements OnInit {

  public appVersion = "beta 2020.0606";
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
    setTimeout(() => {
      this.showApp = true;
    },200);
  }

  public end() {    
    this.showApp = false;
    this.isActive.trans = false;
    setTimeout(() => {
      this.isActive.show = false;
    },1000);
  }

}
