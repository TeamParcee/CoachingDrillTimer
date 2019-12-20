import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
  ) { }


  async canActivate() {
    if (await this.isEmailConfirmed) {
      return true;
    } else {
      this.navCtrl.navigateRoot("/confirm-email")
    }
  }

  isEmailConfirmed() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(true)
        } else {
          return resolve(false)
        }
      })
    })
  }
}
