
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from '../app.setting';

@Injectable({providedIn: 'root',})

export class UtilityService {
    private today : Date = new Date();
    private cacheData:any = {
        portfolio: {
            observable:null,
            data:null
        },
        resume: {
            observable:null,
            data:null
        }
    }

    constructor (private settings:AppSettings,
                 private http:HttpClient) {}

    getMonthlyBackgourndImage() {
        return this.settings.imagePath + 'wallpaper/wallpaper-month-' + (this.today.getMonth() + 1) + '.jpg';
    }

    /**
     * return cache data from HTTP GET request if aplicable
     * @param handler get request data object
     * @param url get request url
     */
    private getHttpRequest(handler:any, url:string):Observable<any> {
        if(handler.data){
            return of(handler.data);
        } else if(handler.observable){
            return handler.observable;
        } else {
            handler.observable = this.http.get<any>(url)
                .pipe(map(response =>  {
                    handler.observable = null;
                    handler.data = response;
                    return response;
                }));
            return handler.observable;
        }
    }

    getPortfolio():Observable<any> {
        return this.getHttpRequest(this.cacheData.portfolio, this.settings.apiUrls.portfolio);
    }

    getResume():Observable<any> {
        return this.getHttpRequest(this.cacheData.resume, this.settings.apiUrls.resume);
    }
}