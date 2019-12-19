import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NativeFeaturesService {

  constructor() { }


  playAlarm() {

    // get the alarm and play it
  }

  sendLocationNotification() {
    // send local notification ;
  }

  sendFirebaseNotification() {
    // send firebase notification
  }

  vibrate() {
    // vibrate the phone
  }

  stopVibrating() {
    // stop vibrating the phone
  }

}
