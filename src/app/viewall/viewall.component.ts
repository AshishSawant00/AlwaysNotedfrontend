import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from '../model/Notes';
import { Page } from '../model/Page';
import { PaginationRequest } from '../model/PaginationRequest';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent {

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

  }
  ngOnInit(): void {
    this.service.getNoteForFeed().subscribe((n) => {
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


}

