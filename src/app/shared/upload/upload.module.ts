import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialDesignModule } from "../material-design/material-design.module";
import { UploadComponent } from "./upload.component";

@NgModule({
    declarations : [UploadComponent],
    imports : [
        CommonModule,
        MaterialDesignModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports : [UploadComponent]
})

export class UploadModule{}