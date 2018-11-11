import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementsComponent } from './statements.component';
import { StatementModule } from './statement/statement.module';
import { StatementListComponent } from './statement/list.component';
import { StatementEditComponent } from './statement/edit.component';

var routes = [
  {
    path: 'statements', component: StatementsComponent, children: [
      { path: '', component: StatementListComponent },
      { path: 'edit/:id', component: StatementEditComponent },
      { path: 'add/:text', component: StatementEditComponent },
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
