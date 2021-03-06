import { Injectable } from '@angular/core';
import { Plan } from './plan.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})

export class Activity {
  constructor(
    public name?: string,
    public duration?: number,
    public startTime?: string,
    public notes?: string,
    public id?: string,
    public order?: number,
    public planId?: string,
    public endTime?: string,
  ) { 
  
  }

  

}

export class ActivityService {

  constructor(
  ) { }

  currentActivity;
  nextActivity;
  currentActivities: Activity[];

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
