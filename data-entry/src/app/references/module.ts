import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencesRoutingModule } from './references-routing.module';
import { ReferencesComponent } from './references.component';
import { MaterialModule } from '../material.module';
import { ReferenceModule } from './reference/module';

@NgModule({
  declarations: [
    ReferencesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReferencesRoutingModule,
    ReferenceModule,
  ],
  exports: [
    ReferencesComponent,
  ]
})
export class ReferencesModule { }
