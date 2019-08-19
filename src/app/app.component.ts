import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { UtilityService } from './shared/utility.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'LCL - Website Development';
  constructor (private titleservice: Title,
               private utilityService: UtilityService) {
    this.titleservice.setTitle(this.title);
  }

  ngOnInit () {
    console.log(this.utilityService.getMonthlyBackgourndImage());
  }
}
