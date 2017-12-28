import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Workshop } from '../models/workshop';

@Injectable()
export class Favorites {

    favoriteWorkshops: any;


    constructor(public storage: Storage) {
        this.favoriteWorkshops = storage.get('favoriteWorkshops');
    }

    get getFavorites() {
        return this.favoriteWorkshops;
    }

    addWorkshop(workshop: Workshop) {
        this.favoriteWorkshops.push(workshop);
        this.storage.set('favoriteWorkshops', this.favoriteWorkshops);
    }

    deleteWorkshop(workshop: Workshop) {
        let index: number = this.favoriteWorkshops.indexOf(workshop);
        if (index !== -1) {
            this.favoriteWorkshops.splice(index, 1);
        }
        this.storage.set('favoriteWorkshops', this.favoriteWorkshops);

    }



}
