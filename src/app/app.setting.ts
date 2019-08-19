import {Injectable } from '@angular/core';

@Injectable({providedIn: 'root',})

export class AppSettings {
    apiUrls:any = {
        portFolio : '/api/portfolio.json'
    };
    imagePath:string = 'assets/images/';
}