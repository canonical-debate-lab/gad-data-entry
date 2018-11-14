import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextListComponent } from './list.component';
import { ContextEditComponent } from './edit.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ContextPlaceholderComponent } from './placeholder.component';
import { ContextService } from './context.service';
import { ContextSelectionComponent } from './selection.component';
import { StatementService } from 'src/app/statements/statement/statement.service';

@NgModule({
  declarations: [
    ContextListComponent,
    ContextEditComponent,
    ContextPlaceholderComponent,
    ContextSelectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ContextListComponent,
    ContextEditComponent,
    ContextPlaceholderComponent,
    ContextSelectionComponent,
  ],
  providers: [
    ContextService,
    StatementService,
  ],
})
export class ContextModule { }
