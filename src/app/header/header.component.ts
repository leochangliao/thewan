import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  toggleMenu:boolean=false;
  renderFixedMenu:boolean=false;
  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (e): void => {
    let pos = document.getElementsByTagName("html")[0].scrollTop;
    if(pos >= 300 && !this.renderFixedMenu) {
      this.renderFixedMenu = true;
    } else if(pos < 100 && this.renderFixedMenu) {
      this.renderFixedMenu = false;
    }
  };

}
