import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  isLoading = false;
  portfolio : any = [];
  errorMessage: string = "";
  constructor(private utilityService: UtilityService, protected sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.isLoading = true;
    this.utilityService.getPortfolio().subscribe(resp =>{
      this.portfolio = resp || [];
      this.isLoading = false;
    }, error => {
      if(error && error.message){
        this.errorMessage = error.message;
      }
      this.isLoading = false;
    });
  }

  trustedHtml(str:string) {
    return this.sanitizer.bypassSecurityTrustHtml(str || '');
  }

}
