import { Component, OnInit } from '@angular/core';
import { PlanService, Plan } from '../services/plan.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  constructor(
    private planService: PlanService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  plan: Plan = new Plan();
  
  save() {
    this.planService.addPlan(this.plan).then(() => {
      this.navCtrl.navigateBack("/tabs/practice-plans")
    })
  }
}
