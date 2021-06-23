
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private jwtHelper: JwtHelperService, 
      private router: Router, 
      private route : ActivatedRoute) {
    }
    canActivate() {
      const token = localStorage.getItem("jwt");

      if (token && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }else{
        this.router.navigate(["/login"],{relativeTo : this.route});
        return false;
      }
    }
  }
