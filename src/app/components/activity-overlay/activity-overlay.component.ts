import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Activity } from '../../models/strava/activity';

@Component({
  selector: 'app-activity-overlay',
  templateUrl: './activity-overlay.component.html',
  styleUrls: ['./activity-overlay.component.scss']
})
export class ActivityOverlayComponent implements OnInit {

  @Input() activity: Activity;

  constructor() { }

  ngOnInit() {
  }

}
