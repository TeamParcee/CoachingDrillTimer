import { Component, OnInit } from '@angular/core';
import { PlanService, Plan } from 'src/app/services/plan.service';
import { ViewNotesPage } from 'src/app/view-notes/view-notes.page';
import { Activity } from 'src/app/services/activity.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {

  constructor(
    private planService: PlanService,
    private helper: HelperService
  ) { }


  plan: Plan

  ngOnInit() { }


  async ionViewWillEnter() {
    await this.getNextPlan();
  }

  async getNextPlan() {
    this.planService.getNextPlan().then((plan: Plan)=>{
      this.plan = plan;
      this.getActivities(plan);
    })
  }

  viewNotes(activity: Activity) {
    this.helper.openModal(ViewNotesPage, {activity: activity})
  }

  getActivities(plan:Plan){
    //  TODO: get activities from firebase
  }
}
