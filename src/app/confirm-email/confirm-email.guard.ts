import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
  ) { }

  user = this.userService.user;

  canActivate() {
    if (this.user) {
      if (this.user.emailVerified) {
        return true;
      } else {
        this.navCtrl.navigateRoot("/confirm-email")
      }
    } else {
      console.log("no user");
      this.navCtrl.navigateBack("/login")
    }
  }
}
