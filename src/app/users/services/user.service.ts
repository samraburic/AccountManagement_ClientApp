import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ChangePassword } from "../models/change-password.model";
import { User } from "../models/user.model";

@Injectable({providedIn : 'root'})
export class UserService{
    constructor(private http : HttpClient){}

    getUsers(){
        return this.http.get<User[]>(`${environment.apiUrl}/User`).pipe(
            catchError(this.handleError)
        );
    }

    deleteUser(id : number) {
        return this.http.delete<User>(`${environment.apiUrl}/User/${id}`).pipe(
           catchError(this.handleError)
        );
    }

    getUserById(id : number) {
      return this.http.get<User>(`${environment.apiUrl}/User/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    updateUser(id : number, user : User) {
      return this.http.put<User>(`${environment.apiUrl}/User/${id}`, user).pipe(
       catchError(this.handleError)
      );
    }

    addUser(user : User) {
      return this.http.post<User>(`${environment.apiUrl}/User`, user).pipe(
        catchError(this.handleError)
    );
   }

   changePassword(cp : ChangePassword){

    return this.http.post(`${environment.apiUrl}/Auth/changepassword`,cp).pipe(
      catchError(this.handleError)
    );
  }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error.error}`
          );
        }
        return throwError('Something bad happened; please try again later.');
    }
}
