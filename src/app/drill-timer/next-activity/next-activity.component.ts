import { Component, OnInit } from '@angular/core';
import { Activity, ActivityService } from 'src/app/services/activity.service';
import { ViewNotesPage } from 'src/app/view-notes/view-notes.page';

@Component({
  selector: 'app-next-activity',
  templateUrl: './next-activity.component.html',
  styleUrls: ['./next-activity.component.scss'],
})
export class NextActivityComponent implements OnInit {

  constructor(
    private activityService: ActivityService,
  ) { }


  currentActivity: Activity;
  nextActivity: Activity;


  ngOnInit() {
    this.getCurrentActivity();
    this.getNextActivity();
  }
  ionViewWillEnter(){
    console.log("bitch")
  }
  getNextActivity() {
    this.currentActivity = this.activityService.nextActivity;
    console.log("current", this.currentActivity);
  }

  getCurrentActivity() {
    this.nextActivity = this.activityService.nextActivity
    console.log("next", this.nextActivity)
  }

  viewNotes(activity: Activity) {
    // this.helper.openModal(ViewNotesPage, {activity: activity} )
  }
}
