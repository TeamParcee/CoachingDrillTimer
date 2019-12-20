import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { User, UserService } from './user.service';
import { NavController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private helper: HelperService,
    private userService: UserService,
    private navCtrl: NavController,
    private firebaseService: FirebaseService,

  ) { }



  checkIfIntroSeen(user: User): Promise<boolean> {
    // return if intro has been seen or not

    return

  }
  loginWithEmail(user: User): Promise<boolean> {

    return new Promise((resolve) => {
      // logs the user in
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(async (result) => {
        //return that the login was successfull and update User Params
        this.userService.user = await this.firebaseService.getDocument("/users/" + result.user.uid);
        console.log(this.userService.user, "this is the user");
        return resolve()
      }).catch((e) => {
        this.helper.okAlert("There was a problem", e.message)
      })
    })
  }

  registerWithEmail(user: User): Promise<boolean> {

    return new Promise((resolve) => {
      // create user on firebase
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((result) => {
        user.uid = result.user.uid;
        user.emailVerified = result.user.emailVerified;
        user.password = "******";
        // create user data on firestore
        this.firebaseService.setDocument("users/" + user.uid, { ...user })

        // save user to local variable
        this.userService.user = user;

        // return that the account creation was successfull
        return resolve()
      }).catch((e) => {
        // send error if acount creation was not successfull
        this.helper.okAlert("There was a problem", e.message)
      })
    })




    return
  }


  confirmEmail(): Promise<boolean> {
    // check and return if the users email has been confirmed

    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified) {
          return resolve(true)
        } else {
          return resolve(false)
        }
      })
    })
  }

  sendConfirmationEmail(): Promise<boolean> {
    // send a confirmation email to the user

    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        user.sendEmailVerification().then(() => {
          // return if the email was sent
          return resolve();
        }).catch((e) => {
          // send error if acount creation was not successfull
          this.helper.okAlert("There was a problem", e.message)
        })

      })
    })
  }

  sendPasswordResetEmail(user: User): Promise<boolean> {
    // send a password reset email to the user

    // return if the email was sent successfully

    // send an error if the email could not be sent

    return
  }

  signout(user: User): void {

    // sign user out
    firebase.auth().signOut().then(() => {
      // delete local user data
      this.userService.user = null;

      // navagate to login screen
      this.navCtrl.navigateBack("/login")

    })






  }

  deleteAccount(user: User): void {
    // delete local user data

    // delete userdata from firestore

    // delete firebase account


    // navagate to login screen
  }

}
