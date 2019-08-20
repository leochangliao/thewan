import { Component, OnInit } from '@angular/core';
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
  constructor(private utilityService: UtilityService ) { }

  ngOnInit() {
    this.isLoading = true;
    this.utilityService.getPortfolio().subscribe(resp =>{
      console.log('resp',resp);
      this.portfolio = resp;
      this.isLoading = false;
    }, error => {
      console.log('error ===> ',error);
      if(error && error.message){
        this.errorMessage = error.message;
      }
      this.isLoading = false;
    });
  }

}
