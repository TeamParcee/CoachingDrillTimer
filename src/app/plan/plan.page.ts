import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlanService, Plan } from '../services/plan.service';
import { Activity, ActivityService } from '../services/activity.service';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { HelperService } from '../services/helper.service';
import { UserService, User } from '../services/user.service';
import { TimerService } from '../services/timer.service';
import { AddActivityPage } from '../add-activity/add-activity.page';
import { EditActivityPage } from '../edit-activity/edit-activity.page';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private helper: HelperService,
    private timerService: TimerService,
    private planService: PlanService,
    private nacCtrl: NavController,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
  }


  plan;
  user: User;
  activities;
  orderArray;
  totalTime;
  minDate: string = moment().format();
  maxDate = moment().add("1", "year").format(); date;
  endTime;

  async ionViewWillEnter() {
    await this.getPlan();
  }

  async ionViewWillLeave(){
    this.updateEndTime();
  }
  
  async getPlan() {
    let user = this.userService.user;
    return new Promise((resolve) => {
      this.route.paramMap.subscribe(async (paramMap) => {
        let id = paramMap.get('id');
        this.firebaseService.getDocument("users/" + user.uid + "/plans/" + id).then((plan) => {
          this.plan = plan;
          this.getActivities();
        })
      })
      return resolve()
    })

  }

  async getActivities() {
    let user = this.userService.user;
    firebase.firestore().collection("/users/" + user.uid + "/plans/" + this.plan.id + "/activities")
      .orderBy("order")
      .onSnapshot((activitySnap) => {
        this.totalTime = 0;
        let activities = [];
        this.orderArray = [];
        let time = moment(this.plan.datetime).format("LT");
        let minutes = 0;
        let count = 0;
        this.endTime = time;
        activitySnap.forEach((activity) => {
          count = count + 1;
          let a = activity.data();
          a.startTime = this.getTimeOfEvent(time, minutes);
          activities.push(a);
          this.orderArray.push({ order: count, id: a.id, startTime: a.startTime, duration: a.duration });
          time = a.startTime;
          minutes = a.duration;
          this.totalTime = this.totalTime + (minutes * 1);
          this.endTime = this.getTimeOfEvent(time, minutes);
          activity.ref.update({ startTime: time, endTime: this.endTime });
        })
        this.activities = activities;
      })



  }


  addActivity() {
    this.helper.openModalPromise(AddActivityPage, { plan: this.plan }).then(() => {
      this.getPlan();
    })
  }

  editActivity(activity) {
    this.helper.openModal(EditActivityPage, { plan: this.plan, activity: activity })
  }




  reorderItems(ev) {
    let from = ev.detail.from;
    let to = ev.detail.to;
    let draggedItem = this.orderArray.splice(from, 1)[0];
    this.orderArray.splice(to, 0, draggedItem);
    let count = 0;
    this.orderArray.forEach((item) => {
      count = count + 1;
      item.order = count;

    })
    ev.detail.complete();

    this.updateOrder();

  }

  updateOrder() {
    let user = this.userService.user;
    this.orderArray.forEach((activity) => {

      let endTime = this.getTimeOfEvent(activity.startTime, activity.duration)
      firebase.firestore().doc("/users/" + user.uid + "/plans/" + this.plan.id + "/activities/" + activity.id).update({ order: activity.order })
    })
  }



  getTimeOfEvent(time, minutes) {
    let x = moment(time, "hh:mm a").add('minutes', minutes).format('LT');
    return x;
  }

  updateTime() {
    let user = this.userService.user;
    let time = {
      date: moment(this.plan.isoDatetime).format('ddd, MMM DD, YYYY'),
      isoDatetime: this.plan.isoDatetime,
      datetime: moment(this.plan.isoDatetime).format('llll'),
      timestamp: this.timerService.getTimeStamp(this.plan.isoDatetime),
    }

    this.firebaseService.updateDocument("/users/" + user.uid + "/plans/" + this.plan.id, time);
    this.getPlan();
  }

  updateEndTime() {
    let user = this.userService.user;
    let isoEndTime = moment(this.plan.date + " " + this.endTime, "ddd, MMM DD, YYYY, h:m A").format();
    this.firebaseService.
      updateDocument("/users/" + user.uid + "/plans/" + this.plan.id, { endTime: this.endTime, isoEndTime: isoEndTime, endTimestamp: this.timerService.getTimeStamp(isoEndTime) })
  }


  delete() {
    this.helper.confirmationAlert("Delete Practice Plan", "Are you sure you want to delete this Practice Plan", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.planService.deletePlan(this.plan).then(() => {
            this.nacCtrl.navigateBack("/tabs/practice-plans")
          })
        }
      })
  }

  deleteActivity(activity) {
    let user = this.userService.user;
    this.helper.confirmationAlert("Delete Activity", "Are you sure you want to delete this activity", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.helper.showLoading();
          this.firebaseService.deleteDocument("users/" + user.uid + "/plans/" + this.plan.id + "/activities/" + activity.id).then(() => {
            this.firebaseService.updateDocument("users/" + user.uid + "/plans/" + this.plan.id, { activityCount: (this.plan.activityCount - 1) }).then(() => {
              this.helper.hideLoading();
            })
          })
        }
      })
  }

}