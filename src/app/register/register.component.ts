import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email: '', password: '', countryCode: 'CA' };
  registerForm: FormGroup;
  submitted = false;
  countries: any = [];
  constructor(private formBuilder: FormBuilder, private _router: Router, private _auth: AuthService,
    private notifyService: NotificationService, private _eventsService: EventService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
    });
    const codes = this._eventsService.getRegisteredCountryList();
    const total = this._eventsService.getCountryList();
    codes.forEach(code => {
      this.countries.push(total.find(t => t.Code === code));
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this._auth.checkUser(this.registerUserData.email)
      .subscribe(
        response => {
          if (!response) {
            this._auth.registerUser(this.registerUserData)
              .subscribe(
                res => {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('email', res.email);
                  localStorage.setItem('code', res.code);
                  this.notifyService.showSuccess(`${res.email} successfully registered`, 'Notification:');
                  this.registerUserData = { email: '', password: '', countryCode: '' };
                  this._router.navigate(['/special-events']);
                },
                err => {
                  this.notifyService.showError(err.message, 'Registeration Failure:');
                }
              );
          } else {
            this.notifyService.showError('User Already Registered', 'Registeration Failure:');
          }
        },
        err => {
          this.notifyService.showError(err.error, 'Registeration Failure:');
        }
      );
  }

  onChange() {
    console.log(this.registerUserData.countryCode);
  }

}
