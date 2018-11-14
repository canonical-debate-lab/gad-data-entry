import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './routing.module';
import { LoginComponent } from './component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoginRoutingModule,
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
