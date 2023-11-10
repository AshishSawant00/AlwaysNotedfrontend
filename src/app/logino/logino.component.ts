import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-logino',
  templateUrl: './logino.component.html',
  styleUrls: ['./logino.component.css']
})
export class LoginoComponent {
 
  error: boolean = false;
  logout: boolean = false;
  loginClicked=false;



  loginDetails: LoginDetails = new LoginDetails();
  loginResponse : LoginResponse= new LoginResponse();

  onSubmit() {
    // Handle form submission here, e.g., send a request to your server for authentication.
    // If authentication fails, set this.error = true;
    // If logout is successful, set this.logout = true
  }

  constructor(private router: Router,public service:DataServiceService)
  {

  }


  adnotes()
  {
    this.router.navigate(['/add-notes']);
    this.service.setLogInClicked(true)
  }

  logIn(){

    this.service.login(this.loginDetails.username,this.loginDetails.password).subscribe(
      (response) => {
        this.loginResponse=response;
        // Handle a successful login here, e.g., store user data or token
        console.log('Login successful', this.loginResponse.name);
        this.service.setLogInClicked(true);
        this.router.navigate(['/'])
        this.service.changeName(this.loginResponse.name);
        this.service.setUuid(this.loginResponse.uuid);
        this.service.setId(this.loginResponse.id); 
        
        if(this.loginResponse.uuid!=null){
          this.service.setActualLogInClicked(true);
          alert("Login successful !!!")
        }      

      },
      (error) => {
        // Handle login error here, e.g., display an error message
        console.error('Login errorr', error);
        alert("Please fill valid username and password")
      }
    );
   
  }


  }

  class LoginDetails{
    username:string='';
    password:string='';
   
  }

  class LoginResponse{
    name:string='';
    uuid:string='';
    id:number=1;

  }


