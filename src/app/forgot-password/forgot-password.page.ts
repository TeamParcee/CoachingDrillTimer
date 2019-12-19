import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.service';

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
  user: User;

  sendPasswordResetEmail() {
    this.authService.sendPasswordResetEmail(this.user).then(() => {
      // this.helper.okAlert("Email Sent", "Password reset email has been sent to the email provided")
    })
  }
}
