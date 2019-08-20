
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../app.setting';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root',})

export class UtilityService {
    private today : Date = new Date();
    constructor (private settings:AppSettings,
                 private http:HttpClient) {}

    getMonthlyBackgourndImage () {
        return this.settings.imagePath + 'wallpaper/wallpaper-month-' + (this.today.getMonth() + 1) + '.jpg';
    }

    getPortfolio ():Observable<any> {
        return this.http.get(this.settings.apiUrls.portfolio);
    }
}