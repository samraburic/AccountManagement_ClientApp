import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Client } from "../models/client.model";

@Injectable({providedIn : 'root'})
export class ClientService{
    constructor(private http : HttpClient){}

    getClients(){
        return this.http.get<Client[]>(`${environment.apiUrl}/Client`).pipe(
            catchError(this.handleError)
        );
    }

    deleteClient(id : number) {
        return this.http.delete<Client>(`${environment.apiUrl}/Client/${id}`).pipe(
           catchError(this.handleError)
        );
    }

    getClientById(id : number) {
      return this.http.get<Client>(`${environment.apiUrl}/Client/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    updateClient(id : number, client : Client) {
      return this.http.put<Client>(`${environment.apiUrl}/Client/${id}`, client).pipe(
       catchError(this.handleError)
      );
    }

    addClient(client : Client) {
      return this.http.post<Client>(`${environment.apiUrl}/Client`, client).pipe(
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
