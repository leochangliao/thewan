import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() inlineForm:boolean = false;
  @Input() description:string = "Any comments and suggestions are welcome!";
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
