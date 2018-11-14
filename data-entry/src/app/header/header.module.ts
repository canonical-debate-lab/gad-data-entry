import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/component';
import { LoginModule } from '../login/module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    LoginModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {
}
