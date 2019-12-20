import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { TimerService } from 'src/app/services/timer.service';
import { PlanService, Plan } from '../services/plan.service';
import { HelperService } from '../services/helper.service';
import { ViewNotesPage } from '../view-notes/view-notes.page';

@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private userService: UserService,
    private timerService: TimerService,
    private helper: HelperService,
    private planService: PlanService,
  ) { }



  plan: Plan;
  activities;
  showTimer: boolean;
  timerStarted;
  timerInterval;
  nextActivity;
  currentActivity;

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.stopTimer();
    await this.getNextPlan();

  }

  async ionViewWillLeave() {
    this.stopTimer();
  }

  getNextPlan() {

    let user = this.userService.user;
    let currentTime = this.timerService.getTimeStamp(new Date());
    firebase.firestore().collection("/users/" + user.uid + "/plans/")
      .where("endTimestamp", ">=", currentTime)
      .orderBy('endTimestamp')
      .limit(1).onSnapshot((planSnapshot) => {
        if (planSnapshot.size == 1) {
          this.plan = planSnapshot.docs[0].data() as Plan;
          planSnapshot.docs[0].ref.collection("activities")
            .orderBy("order")
            .onSnapshot((activitiesSnap) => {
              let activities = [];
              activitiesSnap.forEach((activity) => {
                let a = { ...activity.data() }
                a.date = moment(this.plan.date, "ddd, MMM DD, YYYY").format("MMM DD, YYYY ") + a.startTime;
                activities.push(a)
              })
              this.activities = activities;
              this.planService.activities = activities;
              this.runTimer();
            })
        } else {
          console.log("none")
        }

      })
  }


  runTimer() {

    this.showTimer = true;
    if (!this.timerStarted) {
      this.timerStarted = true;
      this.timerService.startPlan();
      this.timerInterval = setInterval(() => {
        this.nextActivity = this.timerService.nextActivity;
        this.currentActivity = this.timerService.currentActivity;
      }, 1000)
    }
  }
  stopTimer() {
    this.timerService.stopPlan();
    clearInterval(this.timerInterval);
    this.showTimer = false;
    this.timerStarted = false;
  }

  viewNotes(activity) {
    this.helper.openModal(ViewNotesPage, { activity: activity })
  }

}
