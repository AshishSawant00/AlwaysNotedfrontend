import { Component, OnInit  } from '@angular/core';
import { DataServiceService } from './service/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';

  userReg = 0;

  loginClicked = false;

  constructor(public dataService: DataServiceService) {

    dataService.logInClicked$.subscribe((value) => {
      this.loginClicked = value;
    })
  }

  login(){
    this.loginClicked= true;

  }





}
function login() {
  throw new Error('Function not implemented.');
}

