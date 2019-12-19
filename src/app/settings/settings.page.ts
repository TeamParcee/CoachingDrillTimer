import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  user: User = this.userService.user;

  signout(){
    this.authService.signout(this.user);
  }

  deleteAccount(){
    this.authService.deleteAccount(this.user)
  }
} 
