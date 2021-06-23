import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/_services';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-addedit',
  templateUrl: './user-addedit.component.html',
  styleUrls: ['./user-addedit.component.css']
})
export class UserAddeditComponent implements OnInit {
  hideSpinner = false;
  errors : string[] = null;
  title = "Dodaj novog korisnika";
  isEdit : boolean = false;
  users : User [] = [];
  userEdit : User;
  form : FormGroup;
  observables : any = [];
  userId : number;

  constructor(
    private fb : FormBuilder,
    private snackBar : MatSnackBar,
    private router : Router,
    private userService : UserService,
    private authService : AuthenticationService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.toggleSpinner();
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get("id");
    });

    this.form = this.fb.group({
      FirstName: ["", [Validators.required, Validators.maxLength(150)]],
      LastName: ["", [Validators.required, Validators.maxLength(150)]],
      UserName: ["", Validators.required],
      Email: [""],
      Phone: [""]
      });

    this.observables.push(this.userService.getUsers());

    if(this.userId !== 0){
      this.observables.push(this.userService.getUserById(this.userId));
      this.isEdit = true;
    }

    forkJoin(this.observables).subscribe(responseList => {
      this.users = responseList[0] as User[];
      if(this.userId !== 0){
        this.userEdit = responseList[1] as User;
        this.displayUser();
      }
    });
  }


  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  displayUser() {
    this.title = "Uredite korisnika";

    this.form.patchValue({
      FirstName : this.userEdit.FirstName,
      LastName : this.userEdit.LastName,
      UserName : this.userEdit.UserName,
      Email: this.userEdit.Email,
      Phone: this.userEdit.Phone
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
      this.updateUser();
    } else {
    this.addUser();
    }
  }

  updateUser() {
    this.userEdit.FirstName = this.form.value.FirstName;
    this.userEdit.LastName = this.form.value.LastName;
    this.userEdit.UserName = this.form.value.UserName;
    this.userEdit.Active = true;
    this.userEdit.Email = this.form.value.Email;
    this.userEdit.Phone = this.form.value.Phone;
    this.userEdit.ModifyByUser = this.authService.UserID;
    this.userEdit.LastChanged = new Date();
    this.userEdit.IsAdmin = false;

    this.userService.updateUser(this.userEdit.UserId, this.userEdit).subscribe(
      () => {
       this.toggleSpinner();
        this.snackBar.open('Korisnik je uspješno uređen!', 'Zatvori', {
          duration: 3000
        });
       this.router.navigate(['/users/']);
      },
      err => {
       this.toggleSpinner();
        this.snackBar.open(err, 'Zatvori');
        console.error(err);
      }
    );

   }

   addUser() {
    let user = new User();
    user.FirstName = this.form.value.FirstName;
    user.LastName = this.form.value.LastName;
    user.UserName = this.form.value.UserName;
    user.Email = this.form.value.Email;
    user.Active = true;
    user.Phone = this.form.value.Phone;
    user.IsAdmin = false;
    user.CreatedByUser = this.authService.UserID;
    user.Created = new Date();

    this.userService.addUser(user).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("", "Uspješno dodan novi korisnik!");
        this.router.navigate(["/users"]);
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
