import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementListComponent } from './list.component';
import { StatementEditComponent } from './edit.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ContextInput } from '../context/input.component';
import { StatementService } from './statement.service';
import { ReferenceModule } from 'src/app/references/reference/reference.module';

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
    ReferenceModule,
  ],
  exports: [
    StatementListComponent,
    StatementEditComponent,
    ContextInput,
  ],
  providers: [
    StatementService,
  ]
})
export class StatementModule { }
