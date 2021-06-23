import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/_services';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-addedit',
  templateUrl: './client-addedit.component.html',
  styleUrls: ['./client-addedit.component.css']
})
export class ClientAddeditComponent implements OnInit {
  hideSpinner = false;
  errors : string[] = null;
  title = "Dodaj novog klijenta";
  isEdit : boolean = false;
  clients : Client [] = [];
  clientEdit : Client;
  form : FormGroup;
  observables : any = [];
  clientId : number;

  constructor(
    private fb : FormBuilder,
    private snackBar : MatSnackBar,
    private router : Router,
    private clientService : ClientService,
    private authService : AuthenticationService,
    private jwtHelper : JwtHelperService,
    private layoutService : LayoutService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.toggleSpinner();
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get("id");
    });

    this.form = this.fb.group({
      Name : ["", [Validators.required, Validators.maxLength(150)]],
      Address : [""],
      Idnumebr : ["", Validators.compose([Validators.pattern(/^[0-9]{13}$/)])]
      });

    this.observables.push(this.clientService.getClients());

    if(this.clientId !== 0){
      this.observables.push(this.clientService.getClientById(this.clientId));
      this.isEdit = true;
    }

    forkJoin(this.observables).subscribe(responseList => {
      this.clients = responseList[0] as Client[];
      if(this.clientId !== 0){
        this.clientEdit = responseList[1] as Client;
        this.displayClient();
      }
    });
  }

  isUserAuthenticated() {
    const token : string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.layoutService.closeNavMenu();
      this.router.navigate(["/login"]);

      return false;
    }
  }


  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  displayClient() {
    this.title = "Uredite klijenta";

    this.form.patchValue({
      Name : this.clientEdit.Name,
      Address : this.clientEdit.Address,
      Idnumebr : this.clientEdit.Idnumebr
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
      this.updateClient();
    } else {
    this.addClient();
    }
  }

  updateClient() {

    this.clientEdit.Name = this.form.value.Name;
    this.clientEdit.Address = this.form.value.Address;
    this.clientEdit.Idnumebr = this.form.value.Idnumebr;
    this.clientEdit.ModifyByUser = this.authService.UserID;
    this.clientEdit.ModifiedDate = new Date();

    this.clientService.updateClient(this.clientEdit.ClientId, this.clientEdit).subscribe(
      () => {
       this.toggleSpinner();
        this.snackBar.open('Klijent je uspješno uređen!', 'Zatvori', {
          duration: 3000
        });
       this.router.navigate(['/clients/']);
      },
      err => {
       this.toggleSpinner();
        this.snackBar.open(err, 'Zatvori');
        console.error(err);
      }
    );

   }

   addClient() {
    let client = new Client();
    client.Name = this.form.value.Name;
    client.Address = this.form.value.Address;
    client.Idnumebr = this.form.value.Idnumebr;
    client.CreatedBy = this.authService.UserID;
    client.CreatedBy = 0;
    client.Created = new Date();

    this.clientService.addClient(client).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("", "Uspješno dodan novi klijent!");
        this.router.navigate(["/clients"]);
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
      duration: 3000
    });
  }
}
