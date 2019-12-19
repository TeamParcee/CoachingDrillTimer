import { Injectable } from '@angular/core';

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
    public password?:string,
    public emailVerified?:boolean,
  ){}
}
export class UserService {

  constructor() { }


  user: User;
}
