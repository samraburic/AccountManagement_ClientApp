import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Client } from 'src/app/clients/models/client.model';
import { ClientService } from 'src/app/clients/services/client.service';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { User } from 'src/app/users/models/user.model';
import { UserService } from 'src/app/users/services/user.service';
import { Meeting } from '../../models/meeting.model';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-meeting-addedit',
  templateUrl: './meeting-addedit.component.html',
  styleUrls: ['./meeting-addedit.component.css']
})
export class MeetingAddeditComponent implements OnInit {
  hideSpinner = false;
  errors : string[] = null;
  title = "Dodaj novi sastanak";
  isEdit : boolean = false;
  meetingId : number;
  form : FormGroup;
  observables : any = [];
  meeting : Meeting[] = [];
  meetingEdit : Meeting;

  clients : Client[]=[];
  users : User[]=[];
  
  constructor(
    private fb : FormBuilder,
    private snackBar : MatSnackBar,
    private meetingService : MeetingService,
    private route : ActivatedRoute,
    private router : Router,
    private layoutService : LayoutService,
    private clientService : ClientService,
    private userService : UserService
  ) {}

  ngOnInit() {
    this.toggleSpinner();
    this.route.paramMap.subscribe(params => {
      this.meetingId = +params.get("id");
    });

    this.form = this.fb.group({
      UserId: [null, Validators.required],
      ClientId: [null, Validators.required],
      MeetingDate: [new Date(), Validators.required],
      MeetingTime : ["",[Validators.required,Validators.pattern("[0-9]{2}:[0-9]{2}")]],
      Description : [""]
    });
    this.observables.push(this.meetingService.getMeetings());

    this.userService.getUsers().subscribe(res=>{
      this.users=res;
    });
    this.clientService.getClients().subscribe(res=>{
      this.clients=res;
    });

    if(this.meetingId !== 0){
      this.observables.push(this.meetingService.getMeetingById(this.meetingId));
      this.isEdit = true;
    }

    forkJoin(this.observables).subscribe(responseList => {
      this.meeting = responseList[0] as Meeting[];
      if(this.meetingId !== 0){
        this.meetingEdit = responseList[1] as Meeting;
        this.displayMeeting();
      }
    });
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  displayMeeting() {
    this.title = "Sastanak";

    this.form.patchValue({
      UserId : this.meetingEdit.UserId,
      ClientId : this.meetingEdit.ClientId,
      MeetingDate : this.meetingEdit.MeetingDate,
      MeetingTime : this.meetingEdit.MeetingTime,
      Description : this.meetingEdit.Description,
    });
  }

  get f1(): any {
    return this.form.controls;
  }

  onSubmit() {
    if(this.form.invalid){
      return;
    }
    if(this.isEdit){
      this.updateMeeting();
    } else {
    this.addMeeting();
    }
  }

  updateMeeting() {
    let date = new Date(this.form.value.MeetingDate);
    date.setHours(18,0,0);
    this.meetingEdit.MeetingDate=date;
    this.meetingEdit.UserId=this.form.value.UserId;
    this.meetingEdit.ClientId=this.form.value.ClientId;
    this.meetingEdit.MeetingTime=this.form.value.MeetingTime;
    this.meetingEdit.Description=this.form.value.Description;


    this.meetingService.updateMeeting(this.meetingEdit.MeetingId, this.meetingEdit).subscribe(
      () => {
        this.snackBar.open('Sastanak je uspješno uređen!', 'Zatvori', {
          duration: 3000
        });
      },
      err => {
       this.toggleSpinner();
        this.snackBar.open(err, 'Zatvori');
        console.error(err);
      }
    );
   }

  addMeeting() {
    let meeting = new Meeting();
    let date = new Date(this.form.value.MeetingDate);
    date.setHours(18,0,0);
    meeting.MeetingDate=date;
    meeting.UserId=this.form.value.UserId;
    meeting.ClientId=this.form.value.ClientId;
    meeting.MeetingTime=this.form.value.MeetingTime;
    meeting.Description=this.form.value.Description;

    this.meetingService.addMeeting(meeting).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("", "Uspješno dodan novi sastanak!");
        this.router.navigate(["/meetings"]);
      },
      err => {
        this.toggleSpinner();
        this.openSnackBar("Error!", err);
        console.log(err);
      }
    );
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
