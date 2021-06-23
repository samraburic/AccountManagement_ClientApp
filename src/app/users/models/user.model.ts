export class User{
    UserId : number;
    FirstName : string;
    LastName : string;  
    UserName : string;
    Password : string;
    Email : string;
    Active : boolean;
    Phone : string;
    CreatedByUser? : number;
    ModifyByUser? : number;
    Created? : Date;
    LastChanged? : Date;
    Deleted? : Date;
    IsAdmin? : boolean;

    jwtToken : string;
}