import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { TimerService } from 'src/app/services/timer.service';
import { PlanService, Plan } from '../services/plan.service';
import { HelperService } from '../services/helper.service';
import { ViewNotesPage } from '../view-notes/view-notes.page';
import { DrillTimerService } from '../services/drill-timer.service';

@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private userService: UserService,
    private timerService: TimerService,
    private drillTimerService: DrillTimerService,
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
  timer;
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
    clearInterval(this.timerInterval);
    console.log("getting current plan...")
    this.drillTimerService.getCurrentPlan().then(() => {
      this.timerInterval = setInterval(() => {
        this.drillTimerService.startTimer().then((result) => {
          console.log(result, "keep going");
          if(!result){
            this.getNextPlan();
          } 
          this.plan = this.drillTimerService.currentPlan;
          this.activities = this.drillTimerService.activities;
          this.currentActivity = this.drillTimerService.currentAcivity;
          this.nextActivity = this.drillTimerService.nextActivity;
          this.timer = this.drillTimerService.timer;
        })

      }, 1000)
    })
  }



  stopTimer() {
    clearInterval(this.timerInterval);

  }

  viewNotes(activity) {
    this.helper.openModal(ViewNotesPage, { activity: activity })
  }

}
