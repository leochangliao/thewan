
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, empty} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppSettings } from '../app.setting';

export interface PostMsg {
    username: string;
    email: string;
    message: string;
}
export interface BookmarkAuth {
    passcode : string;
}
export interface Credentials {
    username: string;
    password: string;
}
export interface DataUpdate {
    token: string;
    type: string;
    data: any;
}
export interface SecureData {
    token: string;
    type: string;
}

@Injectable({providedIn: 'root'})
export class UtilityService {
    private today : Date = new Date();
    private cacheData:any = {
        portfolio: {
            observable: null,
            data: null
        },
        resume: {
            observable: null,
            data:null
        },
        bookmark: {
            observable: null,
            data: null
        }
    }
    public token:string = "";

    constructor (private settings:AppSettings,
                 private http:HttpClient) {}

    getMonthlyBackgourndImage() {
        return this.settings.imagePath + 'wallpaper/wallpaper-month-' + (this.today.getMonth() + 1) + '.jpg';
    }

    parseJsonString(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }

    /**
     * return cache data from HTTP GET request if applicable
     * @param handler get request data object
     * @param url get request url
     */
    private getHttpRequest(handler:any, url:string, params?:any):Observable<any> {
        if (handler.data) {
            return of(handler.data);
        } else if (handler.observable) {
            return handler.observable;
        } else {
            handler.observable = this.http.get<any>(url, {params:params})
                .pipe(map(response =>  {
                    handler.observable = null;
                    handler.data = response;
                    return response;
                }),catchError(error =>{
                    handler.observable = null;
                    return empty(error);
                }));
            return handler.observable;
        }
    }

    deleteCacheData(key) {
        if(this.cacheData[key]) {
            this.cacheData[key].observable = null;
            this.cacheData[key].data = null;
        }
    }

    getPortfolio():Observable<any> {
        return this.getHttpRequest(this.cacheData.portfolio, this.settings.apiUrls.portfolio);
    }

    getResume():Observable<any> {
        return this.getHttpRequest(this.cacheData.resume, this.settings.apiUrls.resume);
    }

    getBookmark(passcode:BookmarkAuth):Observable<any> {
        if(this.cacheData.bookmark.data) {
            return of(this.cacheData.bookmark.data);
        } else {
            return this.http.post(this.settings.apiUrls.bookmark, passcode);
        }
    }

    setCacheData(key:string, data:any) {
        if(this.cacheData[key]) {
            this.cacheData[key].data = data;
        }
    }

    postMessage(msg:PostMsg):Observable<any> {
        return this.http.post(this.settings.apiUrls.message, msg);
    }

    login(auth:Credentials):Observable<any> {
        return this.http.post(this.settings.apiUrls.login, auth);
    }

    getSecureData(payload:SecureData):Observable<any> {
        return this.http.post(this.settings.apiUrls.getData, payload);
    }

    updateData(data:DataUpdate):Observable<any> {
        return this.http.post(this.settings.apiUrls.updateData, data);
    }

    uploadFile(fileToUpload: File):Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('token',this.token);
        return this.http.post(this.settings.apiUrls.upload, formData);
    }
}