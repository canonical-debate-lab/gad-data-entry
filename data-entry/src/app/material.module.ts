import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatStepperModule,
  MatToolbarModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRippleModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatRippleModule,
  MatIconModule,
  MatFormFieldModule,
  MatStepperModule,
  FormsModule,
  MatInputModule,
  MatListModule,
  MatTabsModule,
  MatSelectModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MatChipsModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSnackBarModule,
  MatAutocompleteModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {
}
