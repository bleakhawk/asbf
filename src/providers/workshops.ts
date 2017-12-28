import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Workshop } from '../models/workshop';

@Injectable()
export class Workshops {

    workshops = [];

    constructor(public http: Http, public api: Api) {

        var response = this.api.get('workshops')
            .map(resp => resp.json())
            .subscribe((data) => {
                for (var s of data) {

                    this.workshops.push(s);
                }
            });

    }

    query(params?: any, daysToInclude?: any, stylesToInclude?: string[]) {
        if (!params && (!daysToInclude || !stylesToInclude)) {
            return this.workshops;
        }

        return (this.workshops.filter((workshop) => {
            for (let key in params) {
                let field = workshop[key];
                if (typeof field == 'string' 
                && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return workshop;
                } else if (field == params[key]) {
                    return workshop;
                }
            }
            return null;
        })
        ).filter((workshop) => 
        {  
            if(!stylesToInclude)
            {
                return workshop;
            }
            for (var style of stylesToInclude) 
            {
                var field = workshop['type'];

                if (field.toLowerCase().indexOf(style.toLowerCase()) >= 0) 
                {
                    return workshop;
                } 
                else if (field == style) 
                {
                    return workshop;
                }
            }
            return null;
        }).filter((workshop) => 
        {  
            if(!daysToInclude)
            {
                return workshop;
            }
            for (var day of daysToInclude) 
            {
                var field = workshop['day'];
                if (field.toLowerCase().indexOf(day.toLowerCase()) >= 0) 
                {
                    return workshop;
                } 
                else if (field == day) 
                {
                    return workshop;
                }
            }
            return null;
        });
    }


    defaultWorkshop: any = {
        "name": "Default",
        "artist": "Charles Ogar",
        "type": "Kizomba",
        "room": "Kizomba Room",
        "level": "Intermediate",
        "day": "Thu",
        "time": "7pm",
        "desc": "",
        "profilePic": "assets/img/speakers/cheetah.jpg",
    };

}
