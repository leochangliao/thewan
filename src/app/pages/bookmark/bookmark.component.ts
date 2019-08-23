import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  locked:boolean = true;
  passcode:string = "";
  invalidPasscode = false;
  isLoading = false;
  keypad = [1,2,3,4,5,6,7,8,9,'C',0,'<'];
  retryCounter = 0;
  retryAllowed = 3;
  bookmark = [];
  constructor(private utility:UtilityService) { }

  ngOnInit() {
    this.passcode = localStorage.getItem('bookmark') || "";
    if(this.passcode){
      this.locked = false;
      this.unlock();
    }
  }

  setValue(value){
    if(value === 'C') {
      this.passcode = "";
      return;
    }
    else if(value === '<') {
      this.passcode = this.passcode.substr(0, this.passcode.length - 1);
    } else {
      this.passcode = `${this.passcode}${value}`;
    }
  }

  unlock() {
    this.isLoading = true;
    this.utility.getBookmark(this.passcode).subscribe(
      data=>{
        this.isLoading = false;
        this.locked=false;
        this.bookmark = data;
        localStorage.setItem('bookmark', this.passcode);
      },
      error=>{
        this.isLoading = false;
        this.locked = true;
        this.retryCounter++;
        this.invalidPasscode = true;
        /* give sometime to display animation and then return to normal */
        setTimeout(()=>{
          this.passcode = "";
          this.invalidPasscode = false;
        },3000);
      }
    );
  }

  lock() {
    this.passcode = "";
    this.locked = true;
    this.bookmark = [];
    this.retryCounter = 0;
    localStorage.removeItem('bookmark');
    this.utility.deleteCacheData('bookmark');
  }
}
