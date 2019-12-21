import { Component, OnInit } from '@angular/core';
import { PlanService, Plan } from '../services/plan.service';
import { NavController } from '@ionic/angular';
import { User, UserService } from '../services/user.service';
import * as moment from 'moment';
import { TimerService } from '../services/timer.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  constructor(
    private planService: PlanService,
    private navCtrl: NavController,
    private userService: UserService,
    private timerService: TimerService,
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }

  plan: Plan = new Plan("", "", 0);
  user: User = this.userService.user;
  errorTime;
  errorDate;
  minDate: string = moment().format();
  maxDate = moment().add("1", "year").format();






  ionViewWillEnter() {
  }

  save() {

    if (this.isFormCorrect()) {
      this.helper.showLoading();
      this.plan.endTime = moment(this.plan.isoDatetime).format('LT');
      this.plan.isoEndTime = this.plan.isoDatetime;
      this.plan.date = moment(this.plan.isoDatetime).format('ddd, MMM DD, YYYY');
      this.plan.datetime = moment(this.plan.isoDatetime).format('llll');
      this.plan.timestamp = this.timerService.getTimeStamp(this.plan.isoDatetime);
      this.plan.endTimestamp = this.plan.timestamp;
      this.planService.addPlan(this.plan).then(() => {
        this.helper.hideLoading();
        this.navCtrl.back()
      })
    }

  }


  isFormCorrect() {
    if (!this.plan.isoDatetime) {
      this.errorDate = true;
      return false;
    } else {
      this.errorDate = false;
    }
    if (!this.plan.isoDatetime) {
      this.errorTime = true;
      return false;
    } else {
      this.errorTime = false
      return true
    }
  }
}


