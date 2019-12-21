import { Injectable } from '@angular/core';
import { Activity } from './activity.service';
import { Plan } from './plan.service';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { UserService } from './user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DrillTimerService {

  constructor(
    private helper: HelperService,
    private userService: UserService,
  ) { }


  currentPlan: Plan;
  nextPlan: Plan;
  currentAcivity: Activity;
  nextActivity: Activity;
  activities: Activity[];
  timer: string;
  count = 0;
  length;

  getCurrentPlan() {
    return new Promise((resolve) => {
      let user = this.userService.user;
      let currentTime = this.getTimeStamp(new Date());

      firebase.firestore().collection("/users/" + user.uid + "/plans/")
        .where("endTimestamp", ">=", currentTime)
        .orderBy('endTimestamp')
        .limit(1).onSnapshot((planSnapshot) => {
          if (planSnapshot.size == 1) {
            this.currentPlan = planSnapshot.docs[0].data() as Plan;
            planSnapshot.docs[0].ref.collection("activities")
              .orderBy("order")
              .onSnapshot(async (activitiesSnap) => {
                let activities = [];
                activitiesSnap.forEach((activity) => {
                  let a = { ...activity.data() }
                  a.date = moment(this.currentPlan.date, "ddd, MMM DD, YYYY").format("MMM DD, YYYY ") + a.startTime;
                  a.endDate = moment(this.currentPlan.date, "ddd, MMM DD, YYYY").format("MMM DD, YYYY ") + a.startTime;
                  activities.push(a)
                })
                this.activities = activities;
                return resolve()
              })
          } else {
            return resolve()
          }
        })
    })

  }


  async startTimer() {
    // this.backgroundMode.enable()
    return new Promise((resolve) => {
      let user = this.userService.user;
      let length = this.activities.length;


      if (length > this.count) {
        this.getTime(this.activities[this.count]);
        return resolve(true);
      } else {
        this.count = 0;
        this.getTime(this.activities[this.count]);
        return resolve(false)
      }
    })

    // else {
    //   this.activeActivity = null;
    //   this.currentActivity = { name: "All Activities Have Ended", time: null };
    //   this.nextActivity = {
    //     name: "XXX",
    //     startTime: "XXX",
    //   }
    //   clearInterval(this.timerInterval);
    //   this.count = 0
    // }
  }




  getTime(activity) {
    let activityTime = new Date(activity.date).getTime();
    let currentTime = new Date().getTime();
    let timerTimeRaw = activityTime - currentTime;


    if (timerTimeRaw < 0) {
      this.count++;
      this.startTimer();
      return;
    }


    let timerMinutes = Math.floor((timerTimeRaw % (1000 * 60 * 60)) / (1000 * 60));
    let timerSeconds = Math.floor((timerTimeRaw % (1000 * 60)) / 1000);

    this.timer = ((timerMinutes.toString().length == 1) ? "0" + timerMinutes : timerMinutes) + ":" + ((timerSeconds.toString().length == 1) ? "0" + timerSeconds : timerSeconds);

    if (timerTimeRaw > 359154) {
      this.timer = moment(activityTime).calendar();

    }
    this.currentAcivity = this.activities[this.count];
    this.nextActivity = this.activities[this.count + 1];
  }
  // getTimerCount(activity, currentActivity) {

  //   if (!currentActivity) {
  //     currentActivity = { ...activity };
  //     currentActivity.name = "Time Until First Activity"
  //   }
  //   this.timerInterval = setInterval(() => {
  //     let datetime = activity.date;

  //     let now = new Date().getTime();
  //     let countDownDate = new Date(datetime).getTime();
  //     let distance = countDownDate - now;

  //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);


  //     let time = "";
  //     time += (days) ? days + " days " : "";
  //     time += (hours) ? hours + " hours " : "";
  //     time += (minutes) ? minutes + " mins " : "";
  //     time += (seconds) ? seconds + " secs " : "";



  //     if (distance < 0) {

  //       this.activeTime = "Time Past";
  //       if (this.showAlert) {
  //         this.startVibration();
  //         this.helper.stopTimerAlert(activity).then(() => {
  //           this.stopVibration();
  //           this.showAlert = true;
  //         })
  //       }
  //       this.activeActivity = activity.name;
  //       clearInterval(this.timerInterval);
  //       this.count++;
  //       this.startPlan();
  //     }
  //     else if (distance > 359154) {
  //       time = moment(countDownDate).calendar();
  //       this.currentActivity = {
  //         time: time,
  //         name: currentActivity.name,
  //         startTime: currentActivity.startTime,
  //         notes: currentActivity.notes,
  //         duration: currentActivity.duration
  //       }
  //       this.nextActivity = {
  //         name: activity.name,
  //         startTime: activity.startTime
  //       }
  //     }

  //     else {
  //       this.showAlert = true;
  //       this.currentActivity = {
  //         time: time,
  //         name: currentActivity.name,
  //         startTime: currentActivity.startTime,
  //         notes: currentActivity.notes,
  //         duration: currentActivity.duration
  //       }
  //       this.nextActivity = {
  //         name: activity.name,
  //         startTime: activity.startTime
  //       }
  //     }
  //   }, 1000)
  // }


  getTimeStamp(date) {
    return new Date(date).getTime();
  }
}

