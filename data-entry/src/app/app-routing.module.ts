import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferencePlaceholderComponent } from './references/reference/placeholder.component';
import { ReferenceEditComponent } from './references/reference/edit.component';
import { ReferenceListComponent } from './references/reference/list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/statements', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true },
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
