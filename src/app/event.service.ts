import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getMockCountries, events_by_country } from '../utils/countries';

export interface Country {
  Name: string;
  Code: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = 'http://localhost:3000/api/top-events';
  private _topheadlinesUrl = 'http://localhost:3000/api/top-headlines';
  private _specialeventsUrl = 'http://localhost:3000/api/special';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl);
  }

  getSpecialEvents(code) {
    const params = new HttpParams().set('code', code);
    return this.http.get<any>(this._specialeventsUrl, { params });
  }

  getCountry(code: any = null) {
    if (code != null) {
      const row = getMockCountries().find(c => c.Code === code);
      if (row) {
        return row.Name;
      } else {
        return null;
      }
    }
  }

  getRegisteredCountryList() {
    const items = events_by_country;
    return items;
  }

  getCountryList() {
    const items = getMockCountries();
    return items;
  }

  getTopHeadlines(code: any) {
    const params = new HttpParams().set('code', code);
    return this.http.get<any>(this._topheadlinesUrl, { params });
  }

}
