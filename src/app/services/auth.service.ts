import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthUser {
  constructor(
    // public email: string,
    // public password: string,
    // public introSeen: boolean,
    // public emailConfirmed: boolean,
    // public uid: string
  ) { }
}
export class AuthService {

  constructor(

  ) { }



  checkIfIntroSeen(user: AuthUser): Promise<boolean> {
    // return if intro has been seen or not

    return

  }
  loginWithEmail(user: AuthUser): Promise<boolean> {
    // logs the user in

    // save user data to local storage

    //return that the login was successfull

    // send error if account creation was not successfull
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
