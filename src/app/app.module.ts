import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseoComponent } from './baseo/baseo.component';
import { HomeoComponent } from './homeo/homeo.component';
import { LoginoComponent } from './logino/logino.component';
import { SignupoComponent } from './signupo/signupo.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';
import { BaseComponent } from './base/base.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsComponent } from './buttons/buttons.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseoComponent,
    HomeoComponent,
    LoginoComponent,
    LoginoComponent,
    SignupoComponent,
    ViewProfileComponent,
    ViewNotesComponent,
    EditNotesComponent,
    BaseComponent,
    AddNotesComponent,
    HeaderComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
