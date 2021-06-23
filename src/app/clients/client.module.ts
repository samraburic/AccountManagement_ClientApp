import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialDesignModule } from "../shared/material-design/material-design.module";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddeditComponent } from './components/client-addedit/client-addedit.component';

@NgModule({
    declarations: [
    ClientListComponent,
    ClientAddeditComponent
  ],
    imports: [
      CommonModule,
      ClientRoutingModule,
      MaterialDesignModule,
      FormsModule,
      ReactiveFormsModule,
    ]
  })
  export class ClientModule { }