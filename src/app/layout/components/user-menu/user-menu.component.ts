import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
constructor(private router: Router, private layoutService: LayoutService){}

ngOnInit() {}


showProfile() {
  this.router.navigateByUrl('users/change-password');
  this.layoutService.closeUserMenu();
}
logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("loggeduser");

  this.layoutService.closeUserMenu();
  this.layoutService.closeNavMenu();
  this.router.navigate(["login"]);
}

}
