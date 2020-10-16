import { Component, OnInit } from '@angular/core';
import { EventService } from './../event.service';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  specialEvents = [];
  constructor(private _eventsService: EventService) { }

  ngOnInit() {
    this._eventsService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => console.log(err)
      );
  }

}
