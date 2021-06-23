import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Meeting } from "../models/meeting.model";

@Injectable({providedIn : 'root'})
export class MeetingService{
    constructor(private http : HttpClient){}

    getMeetings(){
        return this.http.get<Meeting[]>(`${environment.apiUrl}/Meeting`).pipe(
            catchError(this.handleError)
        );
    }

    deleteMeeting(id : number) {
        return this.http.delete<Meeting>(`${environment.apiUrl}/Meeting/${id}`).pipe(
           catchError(this.handleError)
        );
    }

    getMeetingById(id : number) {
      return this.http.get<Meeting>(`${environment.apiUrl}/Meeting/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    updateMeeting(id : number, meeting : Meeting) {
      return this.http.put<Meeting>(`${environment.apiUrl}/Meeting/${id}`, meeting).pipe(
       catchError(this.handleError)
      );
    }

    addMeeting(meeting : Meeting) {
      return this.http.post<Meeting>(`${environment.apiUrl}/Meeting`, meeting).pipe(
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