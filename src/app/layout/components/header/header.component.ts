import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/auth/_services';
import { User } from 'src/app/users/models/user.model';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  timeout;
  loggedUser : User;

  constructor(private layoutService: LayoutService,
     private jwtHelper: JwtHelperService,
     private authService : AuthenticationService
    )
   { }

  ngOnInit() {
    const token: string = localStorage.getItem("jwt");
    if(token){
      this.timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf() - 60000;
    }
    if(this.timeout && this.timeout > 0){
      this.authService.expirationCounter(this.timeout);
    }
    this.loggedUser = this.authService.LoggedUser;
  }

  toggleNavMenu() {
    this.layoutService.navMenuToggle();
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  openUserMenu() {
    this.layoutService.openUserMenu();
  }

}
