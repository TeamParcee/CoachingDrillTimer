import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
@Injectable({
  providedIn: 'root'
})

export class AuthUser {
  constructor(
    public email: string,
    public password: string,
    public introSeen?: boolean,
    public emailConfirmed?: boolean,
    public uid?: string
  ) { }
}
export class AuthService {

  constructor(
    private helper: HelperService,
  ) { }



  checkIfIntroSeen(user: AuthUser): Promise<boolean> {
    // return if intro has been seen or not

    return

  }
  loginWithEmail(user: AuthUser): Promise<boolean> {

    return new Promise((resolve) => {
      // logs the user in
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
        //return that the login was successfull
        return resolve()
      }).catch((e) => {
        this.helper.okAlert("There was a problem", e.message)
      })

    })






    return
  }

  registerWithEmail(user: AuthUser): Promise<boolean> {
    // create user on firebase

    // create user data

    // return that the account creation was successfull

    // send error if acount creation was not successfull
    return
  }


  confirmEmail(user: AuthUser): Promise<boolean> {
    // check and return if the users email has been confirmed
    return
  }

  sendConfirmationEmail(user: AuthUser): Promise<boolean> {
    // send a confirmation email to the user

    // return if the email was sent

    // send and error if the email could not be sent

    return
  }

  sendPasswordResetEmail(user: AuthUser): Promise<boolean> {
    // send a password reset email to the user

    // return if the email was sent successfully

    // send an error if the email could not be sent

    return
  }

  signout(user: AuthUser): void {
    // delete local user data

    // sign user out

    // navagate to login screen

  }

  deleteAccount(user: AuthUser): void {
    // delete local user data

    // delete userdata from firestore

    // delete firebase account


    // navagate to login screen
  }

}
