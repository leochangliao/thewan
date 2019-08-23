import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})

export class AppSettings {
    apiUrls:any = {
        portfolio : 'https://api.thewan.ca/portfolio.php',
        resume: 'https://api.thewan.ca/resume.php',
        message: environment.postMessageApi
    };
    imagePath:string = 'assets/images/';
}