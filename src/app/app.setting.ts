import {Injectable } from '@angular/core';

@Injectable({providedIn: 'root',})

export class AppSettings {
    apiUrls:any = {
        portfolio : 'http://thewan.ca/api/portfolio.php'
    };
    imagePath:string = 'assets/images/';
}