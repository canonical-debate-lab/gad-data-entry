import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { StatementsModule } from './statements/statements.module';
import { HeaderModule } from './header/header.module';
import { ReferencesModule } from './references/references.module';
import { ContextsModule } from './contexts/contexts.module';
import { LoginModule } from './login/module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,

    HeaderModule,
    LoginModule,
    StatementsModule,
    ReferencesModule,
    ContextsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
