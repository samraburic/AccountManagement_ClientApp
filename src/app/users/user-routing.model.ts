import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { UserAddeditComponent } from "./components/user-addedit/user-addedit.component";
import { UserListComponent } from "./components/user-list/user-list.component";

const routes: Routes = [
    {
      path: '',
      component: UserListComponent
    },
    {
        path: 'addedit/:id',
        component: UserAddeditComponent
    },
    {
      path : 'change-password', component : ChangePasswordComponent
    }

  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
    export class UserRoutingModule { }