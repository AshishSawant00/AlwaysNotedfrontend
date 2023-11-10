import { Component } from '@angular/core';
import { Notes } from '../model/Notes';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent {

constructor(public service:DataServiceService){

}

  notes:Notes=new Notes();


  addMsg:string='Please add Your note';

  submitAddNotes(){
    this.service.currentUuid.subscribe((id)=>{
      this.notes.uuid=id
    })

  
    this.service.saveNote(this.notes)
    .subscribe((e)=>{
      
    this.addMsg=e
      console.log("Notes added "+this.notes)  
      alert("Note Add Successful !!!")    
    }, (error) => {
      // Handle errors here.
      console.error(error);
    });
  }

}
