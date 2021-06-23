import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MeetingAddeditComponent } from "./components/meeting-addedit/meeting-addedit.component";
import { MeetingCalendarComponent } from "./components/meeting-calendar/meeting-calendar.component";

const routes: Routes = [
    {
      path: '',
      component: MeetingCalendarComponent
    },
    {
      path: 'addedit/:id',
      component: MeetingAddeditComponent
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
    export class MeetingRoutingModule { }