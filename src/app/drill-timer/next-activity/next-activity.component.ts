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

  ngOnInit() {}

  currentActivity: Activity;
  nextActivity: Activity;


  ionViewWillEnter(){
    this.getCurrentActivity();
    this.getNextActivity();
  }
  
  getNextActivity(){
    this.activityService.getNextActivity().then((activity)=>{
      this.nextActivity = activity
    })
  }

  getCurrentActivity(){
    this.activityService.getActiveActivity().then((activity)=>{
      this.currentActivity = activity
    })
  }

  viewNotes(activity: Activity){
    // this.helper.openModal(ViewNotesPage, {activity: activity} )
  }
}
