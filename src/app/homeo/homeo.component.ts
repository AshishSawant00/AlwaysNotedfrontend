import { Component } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-homeo',
  templateUrl: './homeo.component.html',
  styleUrls: ['./homeo.component.css']
})
export class HomeoComponent {
 
  loginClicked : boolean = false;
  constructor(public service : DataServiceService){
    this.service.logInClicked$.subscribe(e => 
      this.loginClicked=e)
      console.log("Login from  home-component - "+this.loginClicked);
      
  }
}
