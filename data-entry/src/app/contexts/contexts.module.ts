import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextsRoutingModule } from './contexts-routing.module';
import { ContextsComponent } from './contexts.component';
import { MaterialModule } from '../material.module';
import { ContextModule } from './context/context.module';

@NgModule({
  declarations: [
    ContextsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ContextsRoutingModule,
    ContextModule,
  ],
  exports: [
    ContextsComponent,
  ]
})
export class ContextsModule { }
