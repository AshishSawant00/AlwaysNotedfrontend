import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';
import { HomeoComponent } from './homeo/homeo.component';
import { LoginoComponent } from './logino/logino.component';
import { SignupoComponent } from './signupo/signupo.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewallComponent } from './viewall/viewall.component';

const routes: Routes = [
  {
    path:'',
    component : HomeoComponent
},
  {
    path:'login',
    component : LoginoComponent
  },
  {
    path:'signup',
    component:SignupoComponent
  },
  {
    path: 'add-notes',
    component : AddNotesComponent
  },
  {
    path:'editNotes/:id',
    component : EditNotesComponent
  },
  {
    path:'view-notes',
    component: ViewNotesComponent
  },
  {
    path:'viewprofile',
    component: ViewProfileComponent
  },
  {
    path:'buttons',
    component: ButtonsComponent
  },
  {
    path: 'feed',
    component: ViewallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
