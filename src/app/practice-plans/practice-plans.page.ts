import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlanService, Plan } from '../services/plan.service';
import { UserService } from '../services/user.service';
import { HelperService } from '../services/helper.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-practice-plans',
  templateUrl: './practice-plans.page.html',
  styleUrls: ['./practice-plans.page.scss'],
})
export class PracticePlansPage implements OnInit {

  constructor(
    private planService: PlanService,
    private userService: UserService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }

  plans: Plan[];



  async ionViewWillEnter() {
    await this.getPlans();
  }



  getPlans() {
    let user = this.userService.user;
    firebase.firestore().collection("users/" + user.uid + "/plans/")
      .onSnapshot((plansSnap) => {
        let plans = [];
        plansSnap.forEach((plan) => {
          plans.push(plan.data())
        })
        this.plans = plans;
      })
  }

  delete(plan) {
    this.helper.confirmationAlert("Delete Practice Plan", "Are you sure you want to delete this Practice Plan", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.planService.deletePlan(plan).then(() => {
          })
        }
      })
  }


}
