import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {

  isReady:boolean = false;
  isLoading:boolean= true;
  errorMessage:string = "";
  resumeData:any = {};
  private stopTimer:any = null;
  constructor(private utilities:UtilityService) { }

  ngOnInit() {
    /* get resume and skills */
    this.utilities.getResume().subscribe(
      resp => {
        this.resumeData = resp;
        this.isLoading = false;

        /* initiate skill bar if no mouse movement entering the page */
        this.stopTimer = setTimeout(()=>{
          this.setSkillBar();
        },2000);
      },
      error => {
        if(error && error.message){
          this.errorMessage = error.message;
        }
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    clearTimeout(this.stopTimer);
  }

  setSkillBar() {
    if(this.resumeData.skill && !this.isReady){
      this.isReady = true;
    }
  }
}
