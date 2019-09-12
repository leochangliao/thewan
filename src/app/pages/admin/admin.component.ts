import { Component, OnInit } from '@angular/core';
import { Credentials, UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  postData:Credentials = {
    username:"",
    password:""
  };

  isSending:boolean = false;
  successMessage:boolean = false;
  errorMessage:string = "";

  constructor(private utility:UtilityService) { }

  ngOnInit() {
  }

  private delayResetSending(success) {
    setTimeout(()=>{
      this.isSending = false;
      this.successMessage = success;
    },1000);
  }

  private initSending() {
    this.isSending = true;
  }

  onSubmit() {
    this.initSending();
    this.utility.login(this.postData).subscribe(
      resp => {
        this.delayResetSending(true);
        console.log(resp)
      },
      error => {
        if(error && error.message){
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "Invalid user and password, please try again later.";
        }
        this.delayResetSending(false);
      }
    );
  }
}
