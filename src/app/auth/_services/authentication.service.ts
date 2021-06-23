
﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/shared/services/data.service';
import { delay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/snackbar.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/users/models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    invalidLogin = true;
    tokenSubscription = new Subscription();
    timeout;

    error = '';

    public currentUser : User;

    constructor(
        private router: Router,
        private http: HttpClient,
        private snackbar: MatSnackBar,
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }


    public get LoggedUser() : User{
      let currentUser = JSON.parse(localStorage.getItem("loggeduser"));

      return currentUser;
    }


    public get UserID() : number{
      this.currentUser= JSON.parse(localStorage.getItem("loggeduser"));
      return this.currentUser.UserId;
    }

    expirationCounter(timeout) {
      this.tokenSubscription.unsubscribe();
      this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          data: ''
        });
        this.logOut();
        this.router.navigate(["/login"]);
      });
    }



    login2(username : string, password : string){
      return  this.http.post(`${environment.apiUrl}/auth/login`, {username,password}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
    }

    logOut() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("loggeduser");
     }




}
