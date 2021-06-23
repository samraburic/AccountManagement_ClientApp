import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAddeditComponent } from "./components/client-addedit/client-addedit.component";
import { ClientListComponent } from "./components/client-list/client-list.component";

const routes: Routes = [
    {
      path: '',
      component: ClientListComponent
    },
    {
        path: 'addedit/:id',
        component: ClientAddeditComponent
      },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
    export class ClientRoutingModule { }