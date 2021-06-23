import { Injectable } from '@angular/core';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import {
    startOfHour,
    addHours,
    setHours,
    addMinutes,
    setMinutes
} from 'date-fns';
import { Meeting } from '../models/meeting.model';

@Injectable()
export class AppService {
 
    getEvents2(actions: CalendarSchedulerEventAction[], meetings : Meeting[]) : Promise<CalendarSchedulerEvent[]>{

        const events : CalendarSchedulerEvent[]=[];


        meetings.forEach(element => {

            let startHour : number =+element.MeetingTime.substring(0,2);
            let startMinute : number  = +element.MeetingTime.slice(3,5);

            let datum : Date = new Date(element.MeetingDate);
            datum.setHours(startHour,startMinute,0);
            datum.setMinutes(startMinute);

            events.push(<CalendarSchedulerEvent>{
                id: `${element.MeetingId}`,
            
                // end: addDays(addMinutes(startOfHour(datum), element.Duration), 0), // dodao addMinutes tako da cu to koristiti prilikom rada sa terminima jer ide 15 minuta ili 30
               
                //start: setMinutes(setHours(addDays(startOfHour(new Date()), 2), 10), 30),
               // start: setMinutes(setHours(addDays(startOfHour(datum), 0), startHour), element.Duration),
               start : startOfHour(addHours(datum, 0)),
               // end: addMinutes(addDays(addMinutes(startOfHour(datum),element.Duration), 0), element.Duration),
               end: addMinutes(startOfHour(addMinutes(datum, 0)),60),//element.Duration
                title: 'Sastanak sa klijentom '+ element.Client?.Name,
                content: '',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
                
            });

            
            
        });


        

        return new Promise(resolve => setTimeout(() => resolve(events), 1500));

    }
}
