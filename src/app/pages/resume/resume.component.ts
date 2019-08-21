import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {

  isReady:boolean = false;
  private stopTimer:any = null;
  constructor() { }

  ngOnInit() {
    /* initiate skill bar if no mouse movement entering the page */
    this.stopTimer = setTimeout(()=>{
      this.setSkillBar();
    },2000);
  }

  ngOnDestroy() {
    clearTimeout(this.stopTimer);
  }

  setSkillBar() {
    this.isReady = true;
  }
}
