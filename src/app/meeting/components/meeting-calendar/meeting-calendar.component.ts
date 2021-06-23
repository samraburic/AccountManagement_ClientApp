import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CalendarDateFormatter, CalendarView, DateAdapter } from 'angular-calendar';
import { addPeriod, CalendarSchedulerEvent, CalendarSchedulerEventAction, CalendarSchedulerViewComponent, endOfPeriod, SchedulerDateFormatter, SchedulerEventTimesChangedEvent, SchedulerViewDay, SchedulerViewHour, SchedulerViewHourSegment, startOfPeriod, subPeriod } from 'angular-calendar-scheduler';
import { addMonths, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Meeting } from '../../models/meeting.model';
import { AppService } from '../../services/app.service';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-meeting-calendar',
  templateUrl: './meeting-calendar.component.html',
  styleUrls: ['./meeting-calendar.component.css'],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: SchedulerDateFormatter
}]

})
export class MeetingCalendarComponent implements OnInit {
  title: string = 'kalendar';

  CalendarView = CalendarView;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewDays: number = 7;
  refresh: Subject<any> = new Subject();
  locale: string = 'en';
  hourSegments: number = 2;
  weekStartsOn: number = 1;
  startsWithToday: boolean = true;
  activeDayIsOpen: boolean = true;
  excludeDays: number[] = []; // [0];
  dayStartHour: number = 8;
  dayEndHour: number = 16;

  minDate: Date = new Date();
  maxDate: Date = endOfDay(addMonths(new Date(), 3));
  dayModifier: Function;
  hourModifier: Function;
  segmentModifier: Function;
  eventModifier: Function;
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

  actions: CalendarSchedulerEventAction[] = [
      {
          when: 'enabled',
          label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
          title: 'Delete',
          onClick: (event: CalendarSchedulerEvent): void => {
              console.log('Pressed action \'Delete\' on event ' + event.id);
              this.onDelete(+event.id);
          }
      },
      {
          when: 'cancelled',
          label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
          title: 'Restore',
          onClick: (event: CalendarSchedulerEvent): void => {
              console.log('Pressed action \'Restore\' on event ' + event.id);
          }
      }
  ];

  onDelete(id : number){

    this.confirmationDialogService.confirm('Otkazivanje', 'Da li želite otkazati termin ... ?','Otkaži','Odustani')
    .then((confirmed) => {
      if(confirmed == true){


        this.meetingService.deleteMeeting(id).subscribe(
            res =>{
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(['appointments']));
            }
        );

      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }





  events: CalendarSchedulerEvent[];

  @ViewChild(CalendarSchedulerViewComponent) calendarScheduler: CalendarSchedulerViewComponent;

  constructor(@Inject(LOCALE_ID) locale: string, private appService: AppService, private dateAdapter: DateAdapter,
  private meetingService : MeetingService,
  private router : Router, private confirmationDialogService : ConfirmationDialogService, public dataService : DataService,
  private jwtHelper : JwtHelperService,private layoutService : LayoutService) {
      this.locale = locale;

      // this.dayModifier = ((day: SchedulerViewDay): void => {
      //     day.cssClass = this.isDateValid(day.date) ? '' : 'cal-disabled';
      // }).bind(this);

      // this.hourModifier = ((hour: SchedulerViewHour): void => {
      //     hour.cssClass = this.isDateValid(hour.date) ? '' : 'cal-disabled';
      // }).bind(this);

      this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
          segment.isDisabled = !this.isDateValid(segment.date);
      }).bind(this);

      this.eventModifier = ((event: CalendarSchedulerEvent): void => {
          event.isDisabled = !this.isDateValid(event.start);
      }).bind(this);

      this.dateOrViewChanged();
  }

  ngOnInit(): void {

    this.meetingService.getMeetings().subscribe(
      res =>{
        this.appService.getEvents2(this.actions,res)
        .then(
            (events: CalendarSchedulerEvent[]) => {
                this.events = events;
                //this.refresh.next();
            });
      }
    );
      // this.appService.getEvents(this.actions)
      //     .then((events: CalendarSchedulerEvent[]) => this.events = events);
  }

  viewDaysOptionChanged(viewDays: number): void {
      console.log('viewDaysOptionChanged', viewDays);
      this.calendarScheduler.setViewDays(viewDays);
  }

  changeDate(date: Date): void {
      console.log('changeDate', date);
      this.viewDate = date;
      this.dateOrViewChanged();
  }

  changeView(view: CalendarView): void {
      console.log('changeView', view);
      this.view = view;
      this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
      if (this.startsWithToday) {
          this.prevBtnDisabled = !this.isDateValid(subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
          this.nextBtnDisabled = !this.isDateValid(addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
      } else {
          this.prevBtnDisabled = !this.isDateValid(endOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
          this.nextBtnDisabled = !this.isDateValid(startOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
      }

      if (this.viewDate < this.minDate) {
          this.changeDate(this.minDate);
      } else if (this.viewDate > this.maxDate) {
          this.changeDate(this.maxDate);
      }
  }

  private isDateValid(date: Date): boolean {
      return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
  }

  viewDaysChanged(viewDays: number): void {
      console.log('viewDaysChanged', viewDays);
      this.viewDays = viewDays;
  }

  dayHeaderClicked(day: SchedulerViewDay): void {
      console.log('dayHeaderClicked Day', day);
  }

  hourClicked(hour: SchedulerViewHour): void {
      console.log('hourClicked Hour', hour);
  }

  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
      console.log('segmentClicked Action', action);
      console.log('segmentClicked Segment', segment);
  }

  eventClicked(action: string, event: CalendarSchedulerEvent): void {
      console.log('eventClicked Action', action);
      console.log('eventClicked Event', event);
  }

  eventTimesChanged({ event, newStart, newEnd, type }: SchedulerEventTimesChangedEvent): void {
      console.log('eventTimesChanged Type', type);
      console.log('eventTimesChanged Event', event);
      console.log('eventTimesChanged New Times', newStart, newEnd);
      const ev: CalendarSchedulerEvent = this.events.find(e => e.id === event.id);
      ev.start = newStart;
      ev.end = newEnd;

    this.meetingService.getMeetingById(+event.id).subscribe(
        res =>{
            let app : Meeting = res;

            let noviStartSat = newStart.getHours().toString();
            let noviStartMin = newStart.getMinutes().toString();
            app.MeetingDate = newStart;
            app.MeetingTime = noviStartSat+':'+noviStartMin;

            this.meetingService.updateMeeting(app.MeetingId, app).subscribe(
                res =>{

                }
            );

        }
    );
      //this.refresh.next();
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.layoutService.closeNavMenu();
      this.router.navigate(["/login"]);

      return false;
    }
  }

}
