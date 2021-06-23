import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material/';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatNativeDateModule, MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';

import { MatMomentDateModule } from '@angular/material-moment-adapter'

import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatGridListModule} from '@angular/material/grid-list';

// import {
//   NgxMatDatetimePickerModule,
//   NgxMatNativeDateModule,
//   NgxMatTimepickerModule
// } from '@angular-material-components/datetime-picker';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatInputModule,
    // MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatNativeDateModule,
    MatTooltipModule,
    //NgxMatDatetimePickerModule,
   // NgxMatNativeDateModule,
   // NgxMatTimepickerModule,
    MatGridListModule,
   // NgxMatSelectSearchModule,
   MatRadioModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    // MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatMomentDateModule,
    MatTooltipModule,
    //NgxMatDatetimePickerModule,
   // NgxMatNativeDateModule,
   // NgxMatTimepickerModule,
    MatGridListModule,
   // NgxMatSelectSearchModule,
   MatRadioModule
  ]
})
export class MaterialDesignModule { }
