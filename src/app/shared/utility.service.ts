
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.setting';

@Injectable({providedIn: 'root',})

export class UtilityService {
    private today : Date = new Date();
    constructor (private settings:AppSettings) {}

    getMonthlyBackgourndImage () {
        return this.settings.imagePath + 'wallpaper/wallpaper-month-' + (this.today.getMonth() + 1) + '.jpg';
    }
}