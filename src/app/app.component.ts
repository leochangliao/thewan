import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { UtilityService } from './shared/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  @ViewChild('dynamicWallpaper',{static: true}) dynamicWallpaperEl:ElementRef;

  private title = 'LCL - Website Development';
  private backgroundImageStyle: string = 'background-image:';
  constructor (private titleservice: Title,
               private utilityService: UtilityService,
               private renderer: Renderer2) {
    this.titleservice.setTitle(this.title);
  }

  ngOnInit () {
    // set dynamic monthly background image
    this.backgroundImageStyle += `url("${this.utilityService.getMonthlyBackgourndImage()}")`;
    this.renderer.setAttribute(this.dynamicWallpaperEl.nativeElement,'style', this.backgroundImageStyle);
  }
}
