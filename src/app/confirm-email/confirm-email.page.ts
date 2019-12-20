import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';

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
  ) { }

  ngOnInit() {
  }

  user: User = this.userService.user;
  confirmationInvertal;

  ionViewWillEnter() {
    this.sendConfirmationEmail()
  }
  ionViewWillLeave() {
    clearInterval(this.confirmationInvertal)
  }

  sendConfirmationEmail() {
    this.authService.sendConfirmationEmail().then(() => {
      this.helper.okAlert("Confirmation Email", "A confirmation email has been sent to " + this.user.email);
      this.confirmationInvertal = setInterval(async () => {
        console.log("checking email confirmed");
        let emailConfirmed = await this.authService.confirmEmail();
        if (emailConfirmed) {

          // this.navCtrl.navigateForward("tabs/drill-timer")
          console.log("email verified", emailConfirmed)
        }
      }, 1000)
    })
  }

  logout() {
    this.authService.signout(this.user)
  }

  login() {
    this.authService.confirmEmail().then((result) => {
      if (result) {
        this.navCtrl.navigateForward("/tabs/drill-timer")
      }
    })
  }
}
