import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/_services';
import { User } from '../users/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedUser : User;
  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.LoggedUser;
  }
}
