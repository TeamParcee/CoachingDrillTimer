import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  user: AuthUser = this.authService.AuthUser;

  signout(){
    this.authService.signout(this.user);
  }

  deleteAccount(){
    this.authService.deleteAccount(this.user)
  }
}
