import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferencesComponent } from './references.component';
import { ReferenceModule } from './reference/reference.module';
import { ReferenceEditComponent } from './reference/edit.component';
import { ReferencePlaceholderComponent } from './reference/placeholder.component';

var routes = [
  {
    path: 'references', component: ReferencesComponent, children: [
      { path: '', component: ReferencePlaceholderComponent },
      { path: 'edit/:id', component: ReferenceEditComponent },
    ]
  },
];

@NgModule({
  imports: [
    ReferenceModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ReferencesRoutingModule { }
