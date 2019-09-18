import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loggedin:boolean = false;

  constructor(private utility:UtilityService) { }

  ngOnInit() {
    this.utility.token = localStorage.token || null;
    if(this.utility.token) {
      this.loggedin = true;
    }
  }
  loggedinHandle(resp:any) {
    this.loggedin = true;
    this.utility.token = resp.key;
  }
  logout() {
    localStorage.removeItem('token');
    this.utility.token = "";
    this.loggedin = false;
  }
}
