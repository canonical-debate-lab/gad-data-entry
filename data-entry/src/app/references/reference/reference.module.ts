import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceListComponent } from './list.component';
import { ReferenceEditComponent } from './edit.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ReferencePlaceholderComponent } from './placeholder.component';

@NgModule({
  declarations: [
    ReferenceListComponent,
    ReferenceEditComponent,
    ReferencePlaceholderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ReferenceListComponent,
    ReferenceEditComponent,
    ReferencePlaceholderComponent,
  ]
})
export class ReferenceModule { }
