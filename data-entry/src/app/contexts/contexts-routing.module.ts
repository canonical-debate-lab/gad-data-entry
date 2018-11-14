import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextsComponent } from './contexts.component';
import { ContextModule } from './context/context.module';
import { ContextEditComponent } from './context/edit.component';
import { ContextPlaceholderComponent } from './context/placeholder.component';
import { ContextListComponent } from './context/list.component';

var routes = [
  {
    path: 'contexts', component: ContextsComponent, children: [
      { path: '', component: ContextPlaceholderComponent },
      { path: 'edit/:id', component: ContextEditComponent },
    ]
  },
];

@NgModule({
  imports: [
    ContextModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ContextsRoutingModule { }
