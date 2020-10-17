import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AuthApp';

  auth: any;
  constructor(private _eventsService: EventService, private _auth: AuthService) { }

  ngOnInit() {
    this.auth = this._auth;
  }

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

  getCountry() {
    const name = this._eventsService.getCountry(localStorage.getItem('code'));
    return name;
  }

}
