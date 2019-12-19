import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }
  user: AuthUser;

  sendPasswordResetEmail() {
    this.authService.sendPasswordResetEmail(this.user).then(() => {
      // this.helper.okAlert("Email Sent", "Password reset email has been sent to the email provided")
    })
  }
}
