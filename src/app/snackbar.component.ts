import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'your-snack-bar',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div style="display:flex; justify-content: flex-end">
    <button mat-button matSuffix mat-icon-button (click)="dismiss()">
      <mat-icon >close</mat-icon>
    </button>
  </div>
  <h4 style='padding-left: 14px; padding-bottom: 0px'>
    Biti ćete odjavljeni u roku od 1 minute.
  </h4>
  <br/>
  <mat-progress-bar mode="determinate" color="#364173" [value]="progressbarValue"></mat-progress-bar>
  `,
  styles:[`
    .mat-snack-bar-container{
      background-color: #ededed;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 !important;
      color: #e17e22;
    }
    .mat-progress-bar{
      position: absolute !important;
      bottom: 0;
    }
  `]
})
export class SnackBarComponent {
  constructor(
    private router: Router,
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
    )
    { }


  progressbarValue = 100;
  curSec: number = 0;

  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
        this.dismiss()
        localStorage.removeItem("jwt");
        localStorage.removeItem("loggeduser");
        this.router.navigate(["/login"]);
      }
    });
  }
  dismiss(){
    this.snackBarRef.dismiss();
  }
  ngOnInit(){
    if(localStorage.getItem('jwt') && localStorage.getItem("loggeduser")){
      this.startTimer(60)
    }
  }
}
