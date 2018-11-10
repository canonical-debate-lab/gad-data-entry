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
  MatToolbarModule
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
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {
}
