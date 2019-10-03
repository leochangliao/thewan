import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})

export class AppSettings {
    apiUrls:any = {
        portfolio : 'https://api.thewan.ca/portfolio.php',
        resume: 'https://api.thewan.ca/resume.php',
        bookmark: environment.bookmarkApi,
        message: environment.postMessageApi,
        login: environment.loginApi,
        updateData: environment.updateDataApi,
        getData: environment.getDataApi,
        upload: environment.upload
    };
    imagePath:string = 'assets/images/';
}