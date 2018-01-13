import { Athlete } from "./strava/athlete";

export class User {
    username: string;
    name: string;
    state: string; 
    athlete: Athlete;
    yearly_goal: number;
    weekly_goal: number;
}
