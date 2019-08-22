import {Injectable } from '@angular/core';

@Injectable({providedIn: 'root',})

export class AppSettings {
    apiUrls:any = {
        portfolio : 'http://api.thewan.ca/portfolio.php',
        resume: 'http://api.thewan.ca/resume.php'
    };
    imagePath:string = 'assets/images/';
}