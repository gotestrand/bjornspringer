import { Bike } from "./bike";
import { Shoe } from "./shoe";
import { Club } from "./club";

export class Athlete {  
    athlete_type: number;
    bikes: Bike[];
    clubs: Club[];
    shoes: Shoe[];
    id:number;
    username:string;   
    resource_state: number;
    firstname: string;
    lastname:string;
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: string;
    created_at: Date;
    updated_at: Date;
    badge_type_id: number;
    profile_medium: string;
    profile: string;
    friend: any;
    friend_count:number;
    follower: any;
    follower_count: number;
    email: string;
    weight: number;
}