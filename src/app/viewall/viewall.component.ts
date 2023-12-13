import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from '../model/Notes';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent {

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
    this.service.getNoteForFeed().subscribe((n) => {
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


}

