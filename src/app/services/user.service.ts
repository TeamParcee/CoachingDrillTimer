import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})

export class User {
  constructor(
    public fname?: string,
    public lname?: string,
    public uid?: string,
    public photoURL?: string,
    public email?: string,
    public password?: string,
    public emailVerified?: boolean,
  ) { }
}
export class UserService {

  constructor(
    private firebaseService: FirebaseService,
  ) {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        this.user = await this.firebaseService.getDocument("/users/" + firebaseUser.uid);
        console.log("user service loaded", this.user)
      }
    })
  }


  user: User;
}
