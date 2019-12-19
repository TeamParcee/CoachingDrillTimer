import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-practice-plans',
  templateUrl: './practice-plans.page.html',
  styleUrls: ['./practice-plans.page.scss'],
})
export class PracticePlansPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }


  viewPlan(){
    this.navCtrl.navigateForward("/plan")
  }

}
