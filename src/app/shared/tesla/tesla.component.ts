import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesla',
  templateUrl: './tesla.component.html',
  styleUrls: ['./tesla.component.scss']
})
export class TeslaComponent implements OnInit {

  public isActive:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
