import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivityService, Activity } from '../services/activity.service';
import { Plan } from '../services/plan.service';
import { FirebaseService } from '../services/firebase.service';
import { UserService, User } from '../services/user.service';
import { HelperService } from '../services/helper.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {


  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private helper: HelperService,
  ) {
    if (!this.activity) {
      this.activity = new Activity("", 0, "", "", "", 1000, "")
    }
  }

  activity: Activity;
  plan: Plan;
  errorName;
  user: User = this.userService.user;
  errorDuration;
  ngOnInit() {
  }

  async ionViewWillEnter() {

  }

  save() {
    if (!this.validateForm) {
      return
    }
    this.helper.showLoading();
    this.activity.endTime = this.getTimeOfEvent(this.activity.startTime, this.activity.duration);
    this.firebaseService.addDocument("users/" + this.user.uid + "/plans/" + this.plan.id + "/activities", this.activity).then(() => {
      this.firebaseService.updateDocument("users/" + this.user.uid + "/plans/" + this.plan.id, { activityCount: (this.plan.activityCount + 1) }).then(() => {
        this.helper.hideLoading();
        this.close();
      })
    })

  }


  getTimeOfEvent(time, minutes) {
    let x = moment(time, "hh:mm a").add('minutes', minutes).format('LT');
    return x;
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
