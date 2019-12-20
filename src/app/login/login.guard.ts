import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private navCtrl: NavController
  ){}

  async canActivate() {
    let loggedIn = await this.isLoggedIn();
    console.log(loggedIn);
    if (loggedIn) {
      return true
    } else {
      return false;
    }
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(true)
        } else {
          this.navCtrl.navigateRoot("/login")
          return resolve(false)
        }
      })
    })
  }
}
