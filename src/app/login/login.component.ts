import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: '', password: '' };
  loginForm: FormGroup;
  submitted = false;
  constructor(private _router: Router, private _auth: AuthService, private notifyService: NotificationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', res.email);
          localStorage.setItem('code', res.code);
          this.notifyService.showSuccess(`${res.email} logged-In Successfully`, 'Notification:');
          this.loginUserData = { email: '', password: '' };
          this._router.navigate(['/special-events']);
        },
        err => {
          this.notifyService.showError(err.error, 'Login Failure:');
        }
      );
  }

}
