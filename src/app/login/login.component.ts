import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: '', password: '' };
  constructor(private _auth: AuthService, private notifyService: NotificationService) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          this.notifyService.showSuccess(`${res.email} logged-In Successfully`, 'Notification');
          this.loginUserData = { email: '', password: '' };
        },
        err => {
          this.notifyService.showError(err.message, 'Login Failure...');
        }
      );
  }

}
