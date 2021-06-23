import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/_services';
import { ChangePassword } from '../../models/change-password.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  loggedUser : User;
  form : FormGroup;

  constructor(private fb : FormBuilder, private authService : AuthenticationService,
    private userService : UserService, private router : Router) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.LoggedUser;

    this.form  = this.fb.group({
      'OldPassword' : ["",Validators.required],
      'NewPassword' : ["",Validators.required],
      'NewPasswordAgain' : ["", Validators.required]
    });
  }

  get f1(){
    return this.form.controls;
  }

  onSubmit(){
    if(this.form.invalid)
    return;

    let cp = new ChangePassword();

    cp.UserId = this.loggedUser.UserId;
    cp.OldPassword = this.form.get('OldPassword').value;
    cp.NewPassword = this.form.get('NewPassword').value;
    cp.ConfirmNewPassword = this.form.get('NewPasswordAgain').value;

    this.userService.changePassword(cp).subscribe(
      res => {
        this.router.navigateByUrl('/');
      }
    );

  }

}
