import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';
import { FirebaseService } from '../services/firebase.service';

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
    private helper: HelperService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  confirmationInvertal;

  ionViewWillEnter() {
    this.sendConfirmationEmail()
  }
  ionViewWillLeave() {
    clearInterval(this.confirmationInvertal)
  }

  sendConfirmationEmail() {
    this.authService.sendConfirmationEmail().then(() => {
      this.helper.okAlert("Confirmation Email", "A confirmation email has been sent to " + this.userService.user.email);
      this.confirmationInvertal = setInterval(async () => {
        console.log("checking email confirmed", this.userService.user);
        let emailConfirmed = await this.authService.confirmEmail();
        if (emailConfirmed) {
          this.userService.user.emailVerified = true;
          this.firebaseService.updateDocument("/users/" + this.userService.user.uid, { emailVerified: true });
          this.navCtrl.navigateForward("tabs/drill-timer")
        }
      }, 2000)
    })
  }

  logout() {
    this.authService.signout(this.userService.user)
  }

  login() {
    this.authService.confirmEmail().then((result) => {
      if (result) {
        this.navCtrl.navigateForward("/tabs/drill-timer")
      }
    })
  }
}
