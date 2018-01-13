import { Injectable } from '@angular/core';
import { BaseRepository } from './base-repository.service';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Athlete } from '../models/strava/athlete';
import { Activity } from '../models/strava/activity';
import * as _ from 'lodash';

@Injectable()
export class AtheleteRepository extends BaseRepository {
  private _endpoint: string = '/athletes';

  constructor(protected _http: Http, protected _authService: AuthService) { 
    super(_http, _authService);
  }

  public getAthlete(id:number): Observable<Athlete> {
    let url = `${this._endpoint}/${id}`;

    return this.httpGet(url)
      .map(this.extractData)
      .map((athlete: Athlete) => {
        return athlete;
      })
      .catch(this.handleError);
  }

  public getActivitiesFollowing(): Observable<Activity[]> {
    let url = `/activities/following`;

    return this.httpGet(url)
      .map(this.extractData)      
      .map((activities: Activity[]) => {
        let activityObjects: Activity[] = [];
        _.each(activities, (activity) => {
          let activityObject = Object.assign(new Activity, activity);
          activityObjects.push(activityObject);
        })
        return activityObjects;
      })
      .catch(this.handleError);
  }

  public getActivities(): Observable<Activity[]> {
    let url = `/athlete/activities`;   
    
    return this.httpGet(url)
      .map(this.extractData)      
      .map((activities: Activity[]) => {
        let activityObjects: Activity[] = [];
        _.each(activities, (activity) => {
          let activityObject = Object.assign(new Activity, activity);
          activityObjects.push(activityObject);
        })
        return activityObjects;
      })
      .catch(this.handleError);
  }

  public getActivity(id:number): Observable<Activity> {
    let url = `/activities/${id}?include_all_efforts=true`;

    return this.httpGet(url)
      .map(this.extractData)
      .map((activities: Activity) => {
        return activities;
      })
      .catch(this.handleError);
  }

  public getRoute(id:number): Observable<any> {
    let url = `/routes/${id}`;

    return this.httpGet(url)
      .map(this.extractData)
      .map((route) => {
        return route;
      })
      .catch(this.handleError);
  }

  public getStream(id:number, stream:string): Observable<any> {
    let url = `/activities/${id}/streams/${stream}?resolution=low&series_type=distance`;

    return this.httpGet(url)
      .map(this.extractData)
      .map((data) => {
        return data;
      })
      .catch(this.handleError);
  }

}
