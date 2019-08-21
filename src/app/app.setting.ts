import {Injectable } from '@angular/core';

@Injectable({providedIn: 'root',})

export class AppSettings {
    apiUrls:any = {
        portfolio : 'http://thewan.ca/api/portfolio.php',
        skills: 'http://thewan.ca/api/skills.php'
    };
    imagePath:string = 'assets/images/';
}