import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementsComponent } from './statements.component';
import { StatementModule } from './statement/statement.module';
import { StatementListComponent } from './statement/list.component';
import { StatementEditComponent } from './statement/edit.component';
import { ReferencePlaceholderComponent } from '../references/reference/placeholder.component';
import { ReferenceEditComponent } from '../references/reference/edit.component';
import { ReferenceListComponent } from '../references/reference/list.component';
import { ReferenceSelectionComponent } from '../references/reference/selection.component';

var routes = [
  {
    path: 'statements', component: StatementsComponent, children: [
      { path: '', component: StatementListComponent },
      {
        path: 'edit/:id', component: StatementEditComponent, children: [
          { path: '', component: ReferencePlaceholderComponent },
          { path: 'reference/edit/:id', component: ReferenceEditComponent },
          { path: 'reference', component: ReferenceSelectionComponent },
          { path: 'reference/:id', component: ReferenceSelectionComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    StatementModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StatementsRoutingModule { }
