import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { Notes } from '../model/Notes';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Page } from '../model/Page';
import { PaginationRequest } from '../model/PaginationRequest';



@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit {

    // Assuming Page<Note> is the structure of your paginated data
  paginationRequest: PaginationRequest = { size: 10, page: 0, search: '', sort: 'createdAt', order: 'DESC' };
  loggedInUserId: number = 0; // Replace with the actual logged-in user ID

  sessionMsg: string = ''; // Replace with your actual session message variable
  notes: Notes[] = []; // Replace with your notes array
  totalElement: number = 0; // Replace with your totalElement variable
  pageNo: number = 0; // Replace with your pageNo variable
  totalPage: number = 0; // Replace with your totalPage variable
  totalPages: any[] = [];
  id: any = 0;
  deleteMsg: string = '';

  notesPage: Page<Notes> = {
    content: this.notes, 
    totalElements: 0,
    totalPages: 0,
    last: false,
    size: 0,
    number: 0,
    numberOfElements: 0
  };

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
    service.currentId.subscribe(e => {
      this.loggedInUserId = e;
    })
  }
  ngOnInit(): void {
    this.service.viewNotes(this.id).subscribe((n) => {
      this.notes = n;
      console.log("Notes --" + n);
    })
    this.loadNotes();
  }

  
  loadNotes() {
    this.service.pagination(this.paginationRequest, this.loggedInUserId).subscribe((data) => {
      this.notesPage = data;
    });
  }

  onPageChange(event: any) {
    this.paginationRequest.page = event.pageIndex;
    this.paginationRequest.size = event.pageSize;
    this.loadNotes();
  }


  showSearchBar = false;
  searchQuery = '';

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      // Clear the search query and perform a reset or reload of your data
      this.searchQuery = '';
      // Call a method to reset or reload your data
      this.loadNotes();
    }
  }

  performSearch() {
    this.paginationRequest.search = this.searchQuery;
    this.loadNotes();
  }







  
  saveNotesAsPdf(i:number) {
    console.log('Download PDF button clicked for note at index:', i);

    this.service.saveNotesAsPdf(this.notes[i]).subscribe(

      (pdfData) => {
        console.log("Notes "+this.notes[i].title+" i - "+i);
        

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
    console.log('Delete button clicked for noteId:', noteId);

    this.service.deleteNote(noteId).subscribe(e => {
      this.deleteMsg = e;
      console.log("Delete Msg - " + this.deleteMsg);
      this.notes = this.notes.filter((note) => note.noteId !== noteId);
      this.router.navigate(["/view-notes"]);
    })


  }

  addNoteToFeed(i:number){
    console.log('Add to Feed button clicked for note at index:', i);

    this.notes[i].toFeed = true;
    console.log("Note  "+ this.notes[i].noteId);
    
    this.service.addNoteToFeed(this.notes[i]).subscribe( e => {
      console.log("Added Note to feed");      
    }
    )
  }

}

