import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.page.html',
  styleUrls: ['./view-notes.page.scss'],
})
export class ViewNotesPage implements OnInit {

  constructor(
    private helper: HelperService,
  ) { }


  activity;
  ngOnInit() {
  }

  close(){
    this.helper.closeModal();
  }
}
