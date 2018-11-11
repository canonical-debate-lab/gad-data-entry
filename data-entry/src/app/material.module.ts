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
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatStepperModule,
  FormsModule,
  MatInputModule,
  MatListModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MatChipsModule,
  MatSnackBarModule,
  MatAutocompleteModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {
}
