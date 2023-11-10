import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from '../model/Notes';
import { DataServiceService } from '../service/data-service.service';
import { ViewNotesComponent } from '../view-notes/view-notes.component';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.css']
})
export class EditNotesComponent {

  notes: Notes= new Notes(); // Define a variable to hold note data
  note1:any;
  id:any=0;

  constructor(private noteService: DataServiceService, public route:Router){

    this.notes= this.noteService.getSharedObject();
   }

  ngOnInit(): void {   

  

  }

  updateNote() {
    // Send an update request to your service
   this.noteService.currentNoteId.subscribe(n => 
    this.notes.noteId=n);
    console.log("Notes Id -- "+this.notes.noteId);
    
    this.noteService.updateNote(this.notes).subscribe(response => {
      
      console.log("Notes  -"+this.notes);
      this.route.navigate(["view-notes"]);
      alert("Notes Update successful !!!")
      
    });
  }
}