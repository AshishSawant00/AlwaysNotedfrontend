import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { Notes } from '../model/Notes';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NotExpr } from '@angular/compiler';


@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {

  sessionMsg: string = ''; // Replace with your actual session message variable
  notes: Notes[] = []; // Replace with your notes array
  totalElement: number = 0; // Replace with your totalElement variable
  pageNo: number = 0; // Replace with your pageNo variable
  totalPage: number = 0; // Replace with your totalPage variable
  totalPages: any[] = [];
  id: any = 0;
  deleteMsg: string = '';

  // Define a constructor if needed for initialization or dependency injection
  constructor(public service: DataServiceService, public route: ActivatedRoute, private router: Router) {
    this.service.currentId.subscribe(i => {
      this.id = i;
    })
    console.log("Id  -- " + this.id);

    this.route.params.subscribe(params => {
      //  this.id = +params['id']; // Capture the ID from the route parameter
      console.log("params - " + +params['id']);

    });

  }
  ngOnInit(): void {
    this.service.viewNotes(this.id).subscribe((n) => {
      this.notes = n;
      console.log("Notes --" + n);
    })
  }

  
  saveNotesAsPdf(i:number) {

    this.service.saveNotesAsPdf(this.notes[i]).subscribe(

      (pdfData) => {

        const blob = new Blob([pdfData], { type: 'application/pdf' });

        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);

        link.download = 'notes.pdf';

        link.click();

      },

      (error) => {

        console.log("error in pdf download");


      }

    );

  }

  showFullContent: boolean[] = [];

  toggleContent(index: number) {
    this.showFullContent[index] = !this.showFullContent[index];
  }

  updateNote(noteId: any, noteTitle: string, i: number) {
    noteId = this.notes[i].noteId;

    this.service.setNoteId(this.notes[i].noteId);
    console.log("Id from update  " + this.notes[i].content + "  " + this.notes[i].noteId);

    this.service.setSharedObject(this.notes[i]);

    this.router.navigate(["/editNotes/" + this.notes[i].noteId])
  }


  confirmDelete(noteId: number): void {
    if (confirm('Are you sure you want to delete this Note?')) {
      this.deleteNote(noteId);
    }
  }


  deleteNote(noteId: number) {

    this.service.deleteNote(noteId).subscribe(e => {
      this.deleteMsg = e;
      console.log("Delete Msg - " + this.deleteMsg);
      this.notes = this.notes.filter((note) => note.noteId !== noteId);
      this.router.navigate(["/view-notes"]);
    })


  }

  addNoteToFeed(i:number){
    this.notes[i].toFeed = true;
    console.log("Note  "+ this.notes[i].toFeed);
    
    this.service.addNoteToFeed(this.notes[i]).subscribe( e => {
      console.log("Added Note to feed");      
    }
    )
  }

}

