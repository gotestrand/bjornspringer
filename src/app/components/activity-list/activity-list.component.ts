import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AtheleteRepository } from '../../repositories/athelete-repository.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Athlete } from '../../models/strava/athlete';
import { Activity } from '../../models/strava/activity';
import * as polyline from '@mapbox/polyline';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  public athlete:Athlete;
  public activities: Activity[];
  public detailedActivity: Activity;
  public feeds: Activity[] = [];

  constructor(
    private _authService: AuthService, 
    private _userService: UserService,
    private _mapService: MapService,
    private _athleteRepository: AtheleteRepository) { 
      
      this.athlete = this._userService.user.athlete;

  }

  ngOnInit() {

    // this._athleteRepository.getAthlete(this.athlete.id).subscribe(athlete => {
    //     this.athlete = athlete;
    // });

    this.loadActivities();
  }

  public loadActivities(): void {
    if (this.feeds['me'] == null) {
      this._athleteRepository.getActivities().subscribe(activities => {        
        this.feeds['me'] = activities;
        this.activities = this.feeds['me'];                  
      });
    } else {
      this.activities = this.feeds['me'];
    }
  }

  public loadActivitiesFollowing(): void {
    if (this.feeds['following'] == null) {
      this._athleteRepository.getActivitiesFollowing().subscribe(activities => {        
        this.feeds['following'] = activities;
        this.activities = this.feeds['following'];                  
      });
    } else {
      this.activities = this.feeds['following'];
    }
  }

  public loadActivity(activity: Activity) {
    
    this._athleteRepository.getActivity(activity.id).subscribe((detailedActivity:Activity) => {
      this.detailedActivity = detailedActivity;
      console.log(detailedActivity);

      this._mapService.drawActivity(detailedActivity.id.toString(), detailedActivity.map.polyline ? detailedActivity.map.polyline : detailedActivity.map.summary_polyline, detailedActivity.name);
    });

  }

  public getStepColor(step) {
    
    if (step.km <= 10) {
      return 'startup';
    } else if (step.km <= 15) {
      return 'longer';
    } else if (step.km <= 22) {
      return 'half-marathon';
    } else {
      return 'pro';
    }
  }

}
