import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  postData:any = {
    username:"",
    email:"",
    message:""
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('data:',this.postData)
  }
}
