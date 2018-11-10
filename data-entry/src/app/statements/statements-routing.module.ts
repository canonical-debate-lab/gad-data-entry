import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementsComponent } from './statements.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: 'statements', component: StatementsComponent }]),],
  exports: [RouterModule]
})
export class StatementsRoutingModule { }
