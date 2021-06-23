import { Client } from "src/app/clients/models/client.model";
import { User } from "src/app/users/models/user.model";

export class Meeting{
    MeetingId : number;
    UserId : number;
    ClientId : number;
    MeetingDate : Date;
    MeetingTime : string;
    Description : string;
    Client? : Client;
    User? : User;
}