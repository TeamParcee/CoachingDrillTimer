import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivityService, Activity } from '../services/activity.service';
import { Plan } from '../services/plan.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
  }

  activity: Activity;
  plan: Plan;

  delete() {
    this.activityService.deleteActivity(this.activity, this.plan).then(() => {
      this.navCtrl.navigateBack('plan');
    })

  }
  save() {
    this.activityService.editActivity(this.activity, this.plan).then(() => {
      this.navCtrl.navigateBack('plan');
    })
  }
}
