import { Component, OnInit } from '@angular/core';
import { PlanService, Plan } from 'src/app/services/plan.service';
import { ViewNotesPage } from 'src/app/view-notes/view-notes.page';
import { Activity } from 'src/app/services/activity.service';
import { HelperService } from 'src/app/services/helper.service';
import * as firebase from 'firebase';
import { TimerService } from 'src/app/services/timer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {

  constructor(
    private planService: PlanService,
    private helper: HelperService,
    private timerService: TimerService,
    private userService: UserService,
  ) { }


  plan: Plan

  ngOnInit() { }


  async ionViewWillEnter() {
  }


  user;

 

  viewNotes(activity: Activity) {
    this.helper.openModal(ViewNotesPage, { activity: activity })
  }




}
