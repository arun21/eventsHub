import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email: '', password: '', countryCode: 'CA' };
  countries: any = [];
  constructor(private _auth: AuthService, private notifyService: NotificationService, private _eventsService: EventService) { }

  ngOnInit() {
    const codes = this._eventsService.getRegisteredCountryList();
    const total = this._eventsService.getCountryList();
    codes.forEach(code => {
      this.countries.push(total.find(t => t.Code === code));
    });
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          this.notifyService.showSuccess(`${res.email} Successfully Registered`, 'Notification');
          this.registerUserData = { email: '', password: '', countryCode: '' };
        },
        err => {
          this.notifyService.showError(err.message, 'Registeration Failure...');
        }
      );
  }

  onChange() {
    console.log(this.registerUserData.countryCode);
  }

}
