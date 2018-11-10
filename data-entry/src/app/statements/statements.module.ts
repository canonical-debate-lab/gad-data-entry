import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementsRoutingModule } from './statements-routing.module';
import { StatementsComponent } from './statements.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    StatementsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StatementsRoutingModule,
  ],
  exports: [
    StatementsComponent,
  ]
})
export class StatementsModule { }
