import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementListComponent } from './list.component';
import { StatementEditComponent } from './edit.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ContextInput } from '../context/input.component';

@NgModule({
  declarations: [
    StatementListComponent,
    StatementEditComponent,
    ContextInput,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    StatementListComponent,
    StatementEditComponent,
    ContextInput,
  ]
})
export class StatementModule { }
