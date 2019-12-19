import { Injectable } from '@angular/core';
import { Plan } from './plan.service';

@Injectable({
  providedIn: 'root'
})

export class Activity {
  constructor(){

  }
}
export class ActivityService {

  constructor() { }

  addActivity(activity: Activity, plan: Plan): Promise<boolean> {
    // save activity to the plan on firebase

    // return that activity was saved

    // return error if activity could not be saved
    return
  }

  editActivity(activity: Activity, plan: Plan): Promise<boolean> {
    // save activity to the plan on firebase

    // return that activity was saved

    // return error if activity could not be saved
    return
  }

  deleteActivity(activity: Activity, plan: Plan): Promise<boolean> {
    // delet activity from the plan on firebase

    // return that activity was deleted

    // return error if activity could not be deleted

    return

  }

  getNextActivity(): Promise<Activity> {
    // get and return the next activity

    return 
  }

  getActiveActivity(): Promise<Activity> {
    // get and return the active activity

    return
  }
}
