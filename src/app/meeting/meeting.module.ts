import { CommonModule } from "@angular/common";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { MaterialDesignModule } from "../shared/material-design/material-design.module";
import { MeetingAddeditComponent } from "./components/meeting-addedit/meeting-addedit.component";
import { MeetingCalendarComponent } from "./components/meeting-calendar/meeting-calendar.component";
import { MeetingRoutingModule } from "./meeting-routing.module";

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from "angular-calendar-scheduler";

@NgModule({
    declarations: [MeetingCalendarComponent, MeetingAddeditComponent],
    providers : [ { provide: LOCALE_ID, useValue: 'en-GB' },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
    imports: [
      CommonModule,
      MeetingRoutingModule,
      MaterialDesignModule,
      FormsModule,
      ReactiveFormsModule,
      // SelectDropDownModule,
      CalendarModule.forRoot({
        provide : DateAdapter,
        useFactory : adapterFactory,
      }),
      SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange', logEnabled: true }),
    ]
  })
  export class MeetingModule { }