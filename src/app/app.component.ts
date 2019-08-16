import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LCL - Website Development';
  constructor (private titleservice: Title) {
    this.titleservice.setTitle(this.title);
  }
}
