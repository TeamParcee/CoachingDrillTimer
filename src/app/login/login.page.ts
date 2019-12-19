import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  user: AuthUser;

  login() {
    this.authService.loginWithEmail(this.user).then(() => {
      this.navCtrl.navigateForward("/tabs/drill-timer")
    })
  }
}