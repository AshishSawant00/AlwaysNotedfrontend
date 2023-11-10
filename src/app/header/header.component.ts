import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  yourColorVariable = 'skyblue';
 
  logIn:boolean=false;
  name:string='';
  backgroundVisible: boolean = true;
  actualLogIn:boolean=false;


constructor(public app:AppComponent, private router: Router, public dataService: DataServiceService){

  dataService.logInClicked$.subscribe((value)=>{
    this.logIn=value;
  })  

  dataService.actualLogInClicked$.subscribe(value =>{
    this.actualLogIn=value;
  })
}


ngOnInit() {
  this.dataService.currentName.subscribe((name) => {
    // Use the name in your header component
    this.name = name;
  });
}
  

login(i:number){
  this.app.userReg=i;
  this.dataService.setLogInClicked(true);
  // this.backgroundVisible = false;
  // this.backgroundVisible = !this.backgroundVisible;
  // Check if the router is navigating to the login page
  if (this.router.url === '/login') {
    // If navigating to the login page, toggle the 'no-bg' class
    document.body.classList.toggle('no-bg');
  }
  

}
signup(i:number){
  this.app.userReg=i;
  this.dataService.setSignUpClicked(true);
  this.dataService.setLogInClicked(true);
}
home(){
  this.dataService.setLogInClicked(false);
}

logout(){
  this.logIn=false;
  this.actualLogIn=false;
  this.dataService.setLogInClicked(false);
  this.dataService.setActualLogInClicked(false);
  this.dataService.setSignUpClicked(false);
}

}
