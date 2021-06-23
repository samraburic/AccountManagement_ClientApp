import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialDesignModule } from "../shared/material-design/material-design.module";
import { UserRoutingModule } from "./user-routing.model";
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddeditComponent } from './components/user-addedit/user-addedit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
    declarations: [
      UserListComponent,
      UserAddeditComponent,
      ChangePasswordComponent
  ],
    imports: [
      CommonModule,
      UserRoutingModule,
      MaterialDesignModule,
      FormsModule,
      ReactiveFormsModule,
    ]
  })
  export class UserModule { }