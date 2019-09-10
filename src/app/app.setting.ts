import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class AppSettings {
    apiUrls:any = {
        portfolio : 'https://api.thewan.ca/portfolio.php',
        resume: 'https://api.thewan.ca/resume.php',
        bookmark: 'https://api.thewan.ca/bookmark.php',
        message: 'https://api.thewan.ca/postmsg.php'
    };
    imagePath:string = 'assets/images/';
}