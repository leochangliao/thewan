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
  constructor(private utility:UtilityService) { }

  ngOnInit() {}

  private initSending() {
    this.isSending = true;
  }

  onSubmit() {
    this.initSending();
    this.utility.login(this.postData).subscribe(
      resp => {
        this.isSending = false;
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
