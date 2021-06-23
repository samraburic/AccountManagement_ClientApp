import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from './layout/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Account Management';

  onDestroy$ = new Subject();
  userMenuOpen: boolean;
  navigationOpen: boolean;
  headerShowed: boolean;

  constructor(private layoutService: LayoutService, router: Router) {
    this.layoutService
      .onUserMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.userMenuOpen = isOpen));

    this.layoutService
      .onNavMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.navigationOpen = isOpen));
  }

  closeUserProfile() {
    this.layoutService.closeUserProfile();
  }

  ngOnDestroy() {
    //this.onDestroy$.next();
  }
}
