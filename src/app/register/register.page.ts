import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }


  user: AuthUser = new AuthUser("", "");

  createAccount() {
    this.authService.registerWithEmail(this.user).then(() => {
      this.navCtrl.navigateForward("/confirm-email")
    })
  }
}
