import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementsRoutingModule } from './statements-routing.module';
import { StatementsComponent } from './statements.component';
import { MaterialModule } from '../material.module';
import { StatementModule } from './statement/module';
import { ReferenceModule } from '../references/reference/module';

@NgModule({
  declarations: [
    StatementsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StatementsRoutingModule,
    StatementModule,
    ReferenceModule,
  ],
  exports: [
    StatementsComponent,
  ]
})
export class StatementsModule { }
