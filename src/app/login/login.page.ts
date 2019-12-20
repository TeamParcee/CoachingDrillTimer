import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  user: User = new User;

  login() {
    this.authService.loginWithEmail(this.user).then(() => {
      this.navCtrl.navigateForward("/tabs/drill-timer")
    })
  }
}
