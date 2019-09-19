import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Credentials, UtilityService } from '../../../shared/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @Output() loggedinHandler = new EventEmitter();

  postData:Credentials = {
    username:"",
    password:""
  };

  isSending:boolean = false;
  errorMessage:string = "";
  keepLoggedin:boolean = false;
  constructor(private utility:UtilityService) { }

  ngOnInit() {}

  onSubmit() {
    this.isSending = true;
    this.utility.login(this.postData).subscribe(
      resp => {
        this.isSending = false;
        if(this.keepLoggedin && resp.key) {
          localStorage.setItem("token",resp.key);
        }
        this.loggedinHandler.emit(resp);
      },
      error => {
        if(error && error.message){
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "Invalid user and password, please try again later.";
        }
        this.isSending = false;
      }
    );
  }
}
