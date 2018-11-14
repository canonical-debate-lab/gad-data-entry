import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceListComponent } from './list.component';
import { ReferenceEditComponent } from './edit.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { ReferencePlaceholderComponent } from './placeholder.component';
import { ReferenceService } from './reference.service';
import { ReferenceSelectionComponent } from './selection.component';
import { StatementService } from 'src/app/statements/statement/statement.service';

@NgModule({
  declarations: [
    ReferenceListComponent,
    ReferenceEditComponent,
    ReferencePlaceholderComponent,
    ReferenceSelectionComponent,
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
    ReferenceSelectionComponent,
  ],
  providers: [
    ReferenceService,
    StatementService,
  ],
})
export class ReferenceModule { }
