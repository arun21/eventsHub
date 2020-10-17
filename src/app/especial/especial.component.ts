import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './../event.service';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  specialEvents = [];
  constructor(private _eventsService: EventService, private _router: Router) { }

  ngOnInit() {
    this._eventsService.getSpecialEvents(localStorage.getItem('code'))
      .subscribe(
        res => {
          console.log(res);
          this.specialEvents = res;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }

  getCountry() {
    const name = this._eventsService.getCountry(localStorage.getItem('code'));
    return name;
  }

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

}
