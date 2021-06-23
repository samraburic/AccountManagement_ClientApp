import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LayoutService {
    private userMenuOpened$ = new BehaviorSubject<boolean>(false);
  private navMenuOpened$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  onNavMenuToggle(): Observable<boolean> {
    return this.navMenuOpened$.asObservable();
  }


  navMenuToggle() {
    this.navMenuOpened$.next(!this.navMenuOpened$.value);
  }



  onUserMenuToggle(): Observable<boolean> {
    return this.userMenuOpened$.asObservable();
  }

  openUserMenu() {
    this.userMenuOpened$.next(true);
  }

  closeUserMenu() {
    this.userMenuOpened$.next(false);
  }

  closeNavMenu() {
    this.navMenuOpened$.next(false);
  }



  onUserProfileToggle(): Observable<boolean> {
    return this.userMenuOpened$.asObservable();
  }

  openUserProfile() {
    this.userMenuOpened$.next(true);
  }

  closeUserProfile() {
    this.userMenuOpened$.next(false);
  }

  
  }
  