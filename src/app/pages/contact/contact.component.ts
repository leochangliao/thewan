import { Component, OnInit, Input } from '@angular/core';
import { PostMsg, UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() inlineForm:boolean = false;
  @Input() description:string = "Any comments and suggestions are welcome!";
  postData:PostMsg = {
    username:"",
    email:"",
    message:""
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
    },1500);
  }

  private initSending() {
    this.isSending = true;
  }

  onSubmit() {
    this.initSending();
    this.utility.postMessage(this.postData).subscribe(
      resp => {
        this.delayResetSending(true);
      },
      error => {
        if(error && error.message){
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "Something went wrong, please try again later.";
        }
        this.delayResetSending(false);
      }
    );
  }
}
