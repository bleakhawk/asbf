import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Workshop } from '../../models/workshop';

@Injectable()
export class Workshops {
    workshops: Workshop[] = [];

    defaultWorkshop: any =  {
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


    constructor(public http: Http) {
        let workshops = [
            //Thu
            {
                "name": "Bachata Moderna Dips & Tricks",
                "artist": "Charles Ogar",
                "type": "Kizomba",
                "room": "Kizomba Room",
                "level": "Intermediate",
                "day": "Thu",
                "time": "7pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Master Level Class",
                "artist": "Ashwin",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Thu",
                "time": "7pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Pachanga & Boogaloo",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Thu",
                "time": "7pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            //Fri
             {
                "name": "Fri 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Fri",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Fri 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Fri",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            //Sat
            {
                "name": "Sat 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Sat",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sat 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Bachata Room",
                "level": "Intermediate",
                "day": "Sat",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sat 3",
                "artist": "Kimberly",
                "type": "Kizomba",
                "room": "Kizomba Room",
                "level": "Intermediate",
                "day": "Sat",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sat 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Sat",
                "time": "12pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sat 3",
                "artist": "Kimberly",
                "type": "Bachata",
                "room": "Bachata Room",
                "level": "Intermediate",
                "day": "Sat",
                "time": "12pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sat 3",
                "artist": "Kimberly",
                "type": "Kizomba",
                "room": "Kizomba Room",
                "level": "Intermediate",
                "day": "Sat",
                "time": "12pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            //Sun
            {
                "name": "Sun 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Sun",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sun 3",
                "artist": "Kimberly",
                "type": "Bachata",
                "room": "Bachata Room",
                "level": "Intermediate",
                "day": "Sun",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sun 3",
                "artist": "Kimberly",
                "type": "Kizomba",
                "room": "Kizomba Room",
                "level": "Intermediate",
                "day": "Sun",
                "time": "11am",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sun 3",
                "artist": "Kimberly",
                "type": "Salsa",
                "room": "Salsa Room",
                "level": "Intermediate",
                "day": "Sun",
                "time": "12pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sun 3",
                "artist": "Kimberly",
                "type": "Bachata",
                "room": "Bachata Room",
                "level": "Intermediate",
                "day": "Sun",
                "time": "12pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
            {
                "name": "Sun 3",
                "artist": "Kimberly",
                "type": "Kizomba",
                "room": "Kizomba Room",
                "level": "Intermediate",
                "day": "Sun",
                "time": "12pm",
                "desc": "",
                "profilePic": "assets/img/speakers/cheetah.jpg",
            },
        ];

        for (let workshop of workshops) {
            //this.workshops.push(new Workshop(workshop));
        }
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
                //console.log('field: ' + field.toLowerCase());
                console.log('style: ' + style.toLowerCase());
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
                //console.log('field: ' + field.toLowerCase());
                console.log('day: ' + day.toLowerCase());
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
}
