import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../auth/_services';
import { DataService } from '../shared/services/data.service';
import { User } from '../users/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  timeout;

  hide = true;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private dataService : DataService,
      private jwtHelper : JwtHelperService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;


      // stop here if form is invalid
      if (this.loginForm.invalid) {

        this.error = "Korisničko ime ili lozinka nisu pravilni!";
          return;
      }

      this.loading = true;
      this.authenticationService.login2(this.f.username.value, this.f.password.value).subscribe(response => {
        const token = (<any>response).Token;
       // this.invalidLogin = false;
        //this.user = (<any>response).User;

        let c : User = (<any>response).User;
        c.jwtToken = token;
        //this.user = c;
        //this.userSubject.next(c);
        this.timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf() - 60000;


        localStorage.setItem('loggeduser',JSON.stringify(c));


        localStorage.setItem("jwt", token);
       let s = localStorage.getItem("jwt");

       //this.dataService.initUser();
       this.authenticationService.expirationCounter(this.timeout);
        this.router.navigate(["/"]);
      }, err => {

        this.error = "Korisničko ime ili lozinka nisu ispravni!";
       this.loading = false;
       // this.invalidLogin = true;
      });;




  }

}
