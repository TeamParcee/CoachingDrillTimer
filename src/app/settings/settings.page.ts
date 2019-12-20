import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private helper: HelperService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  user: User = this.userService.user;

  signout() {
    this.authService.signout(this.user);
  }

  deleteAccount() {
    this.helper.confirmationAlert("Delete Account", "Are you sure you want to delete your account", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.authService.deleteAccount(this.user)
        }
      })
  }
} 
