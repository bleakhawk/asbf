import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-workshop-filter',
    templateUrl: 'workshop-filter.html'
})
export class WorkshopFilterPage {

    typesOfWorkshops = ["Salsa", "Bachata", "Kizomba", "Others"];
    days = ["Thu", "Fri", "Sat", "Sun"];

    constructor(public viewCtrl: ViewController) { }

    close() {
        this.viewCtrl.dismiss();
    }

    thursday: boolean = true;
    friday: boolean = true;
    saturday: boolean = true;
    sunday: boolean = true;

    applyFilters() {
        console.log("thursday new state:" + this.thursday);
        console.log("friday new state:" + this.friday);
        console.log("saturday new state:" + this.saturday);
        console.log("sunday new state:" + this.sunday);
        this.viewCtrl.dismiss();
    }
}

