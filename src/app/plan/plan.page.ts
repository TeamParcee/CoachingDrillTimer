import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlanService, Plan } from '../services/plan.service';
import { Activity, ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private planService: PlanService,
    private activityService: ActivityService,

  ) { }

  ngOnInit() {
  }

  plan: Plan;

  deletePlan() {
    this.planService.deletePlan(this.plan).then(() => {
      this.navCtrl.navigateBack("/tabs/practice-plans")
    })
  }

  addActivity() {
    this.planService.addPlan(this.plan).then(() => {
      this.navCtrl.navigateForward("/add-activity")
    })
  }

  editActivity(activity: Activity) {
    this.navCtrl.navigateForward("/edit-activity")
  }

  deleteActivity(activity: Activity) {
    this.activityService.deleteActivity(activity, this.plan)
  }

  savePlan() {
    this.planService.editPlan(this.plan)
  }

}
