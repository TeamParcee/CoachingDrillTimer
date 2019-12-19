import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Plan{
  constructor(){}
}
export class PlanService {

  constructor() { }

  addPlan(plan: Plan): Promise<boolean> {
    // save plan to firebase

    // return that plan was saved


    //return error if the plan was not saved

    return
  }

  editPlan(plan: Plan): Promise<boolean>{
    // save plan to firebase

    // return that plan was saved


    //return error if the plan was not saved
    return
  }

  deletePlan(plan: Plan): Promise<boolean> {
    // delete plan from firebase

    // return that plan was deleted

    // return error if plan could not be deleted
    return
  }

  getNextPlan(): Promise<Plan>{
    // get the next plan

    return;
  }

}
