import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivityService, Activity } from '../services/activity.service';
import { Plan } from '../services/plan.service';
import { HelperService } from '../services/helper.service';
import { FirebaseService } from '../services/firebase.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private activityService: ActivityService,
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) { }

  activity: Activity;
  plan: Plan;
  errorName;
  user: User = this.userService.user;
  errorDuration;
  edit: boolean;
  ngOnInit() {
  }

  async ionViewWillEnter() {

  }

  save() {
    if (!this.validateForm) {
      return
    }

    this.firebaseService.setDocument("users/" + this.user.uid + "/plans/" + this.plan.id + "/activities/" + this.activity.id, this.activity).then(() => {
      this.close();
    })

  }

  validateForm() {
    if (!this.activity.name) {
      this.errorName = true;
      return false
    } else {
      this.errorName = false;
    }
    if (!this.errorDuration) {
      this.errorDuration = true;
      return false
    } else {
      this.errorDuration = false;
      return true
    }

  }
  close() {
    this.helper.closeModal()
  }

  delete() {
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity?", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.firebaseService.deleteDocument("users/" + this.user.uid + "/plans/" + this.plan.id + "/activities/" + this.activity.id)
            .then(() => {
              this.firebaseService.updateDocument("users/" + this.user.uid + "/plans/" + this.plan.id, { activityCount: (this.plan.activityCount - 1) })
              this.close();
            })
        }
      })
  }
}
