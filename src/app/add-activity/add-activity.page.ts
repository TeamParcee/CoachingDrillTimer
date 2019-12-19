import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivityService, Activity } from '../services/activity.service';
import { Plan } from '../services/plan.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
  }

  activity: Activity = new Activity;
  plan: Plan;

  save(){
    this.activityService.addActivity(this.activity, this.plan ).then(()=>{
      this.navCtrl.navigateBack("/plan");
    })
  }
}
