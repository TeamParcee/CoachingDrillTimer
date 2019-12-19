import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  user: User = this.userService.user;

  logout() {
    this.authService.signout(this.user)
  }
  
  login() {
    this.authService.confirmEmail(this.user).then((result) => {
      if (result) {
        this.navCtrl.navigateForward("/tabs/drill-timer")
      }
    })
  }
}
