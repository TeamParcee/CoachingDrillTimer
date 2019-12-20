import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})

export class Plan {

  constructor(
    public id?: string,
    public datetime?: string,
    public activityCount?: number,
    public isoDatetime?: string,
    public timestamp?: number,
    public endTimestamp?: number,
    public endTime?: string,
    public isoEndTime?: string,
    public date?: string,
  ) { }
}
export class PlanService {

  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) { }


  nextPlan: Plan;
  activities;


  addPlan(plan: Plan) {
    let user = this.userService.user;
    return new Promise((resolve) => {
      this.firebaseService.addDocument("users/" + user.uid + "/plans", plan).then(() => {
        return resolve();
      })
    })

  }

  deletePlan(plan: Plan) {
    let user = this.userService.user;
    return new Promise((resolve) => {
      this.firebaseService.deleteDocument("/users/" + user.uid + "/plans/" + plan.id).then(() => {
        return resolve();
      })
    })
  }

  editPlan(plan: Plan) {
    let user = this.userService.user;
    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + user.uid + "/plans/" + plan.id, plan).then(() => {
        return resolve();
      })
    })
  }

  getNextPlan(): Promise<Plan> {
    let user = this.userService.user
    // get the next plan

    return;
  }

}
