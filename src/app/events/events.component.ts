import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { listedCountries } from '../../utils/countries';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];
  countries: any = [];
  selectedCountry: any = 'IN';
  country: any;
  today: Date = new Date();
  main_url = 'http://img.freeflagicons.com/main.jpg';
  constructor(private _eventsService: EventService) { }

  ngOnInit() {
    this._eventsService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      );

    const totalList = this._eventsService.getCountryList();
    listedCountries.forEach((country) => {
      this.countries.push(totalList.find(t => t.Code.toLowerCase() === country));
    });
    this.selectedCountry = 'CA';
  }

  onSelectCountry(event: any) {
    if (event) {
      const code = event.Code.toLowerCase();
      this._eventsService.getTopHeadlines(code)
        .subscribe(
          res => this.events = res,
          err => console.log(err)
        );
      console.log(this.events);
    } else {
      this.ngOnInit();
    }
  }

  getCountry() {
    const name = this._eventsService.getCountry(this.selectedCountry);
    return name;
  }

  getWidth() {
    return '420px';
  }
}
