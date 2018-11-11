import {NgModule} from '@angular/core';

import {HeaderComponent} from './header.component';
import {MaterialModule} from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    MaterialModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {
}
