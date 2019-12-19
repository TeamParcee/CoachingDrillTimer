import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.service';

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


  user: User = new User("", "", "", "", "", "", false,);

  createAccount() {
    this.authService.registerWithEmail(this.user).then(() => {
      this.navCtrl.navigateForward("/confirm-email")
    })
  }
}
