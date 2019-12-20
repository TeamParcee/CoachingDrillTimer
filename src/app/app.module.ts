import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { ActivityService } from './services/activity.service';
import { AuthService } from './services/auth.service';
import { NativeFeaturesService } from './services/native-features.service';
import { PlanService } from './services/plan.service';
import { TimerService } from './services/timer.service';
import { HelperService } from './services/helper.service';
import { UserService } from './services/user.service';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/* native controls
ionic cordova plugin add cordova-plugin-media
npm install @ionic-native/media
ionic cordova plugin add cordova-plugin-vibration
npm install @ionic-native/vibration
ionic cordova plugin add cordova-plugin-background-mode
npm install @ionic-native/background-mode
ionic cordova plugin add cordova-plugin-local-notification
npm install @ionic-native/local-notifications



*/
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCsh5-BlQfW-hy45_JD4ATiE0ql8hBrCXs",
  authDomain: "coachingdrilltimer.firebaseapp.com",
  databaseURL: "https://coachingdrilltimer.firebaseio.com",
  projectId: "coachingdrilltimer",
  storageBucket: "coachingdrilltimer.appspot.com",
  messagingSenderId: "24268293516",
  appId: "1:24268293516:web:0542821ed0f75673e682a9",
  measurementId: "G-1C9ZMHV064"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    ActivityService,
    AuthService,
    HelperService,
    NativeFeaturesService,
    PlanService,
    TimerService,
    UserService,
    SplashScreen,
    Vibration,
    Media,
    BackgroundMode,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
