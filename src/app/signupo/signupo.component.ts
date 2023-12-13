import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { ReactiveFormsModule } from '@angular/forms';
import { DataServiceService } from '../service/data-service.service';





@Component({
  selector: 'app-signupo',
  templateUrl: './signupo.component.html',
  styleUrls: ['./signupo.component.css']
})




export class SignupoComponent {

  // user = { username: '' }; // Initial user object
  showMessage = false; // Flag to control message visibility

  onInputFocus() {
    this.showMessage = true;
  }

  user:User= new User();

  sessionMsg: string | null = null;

  submitForm() {
    // Implement your form submission logic here
    // You can use this.user to access form values
    // Once the form is submitted, set this.sessionMsg with the success message
    // Example success message
  }

  constructor(private userService: DataServiceService) {}

  submitSignup() {
    this.userService.signup(this.user.name, this.user.username, this.user.email, this.user.password).subscribe(
      (response) => {
        // Handle a successful signup here
        this.sessionMsg = 'Registration successful!';
        console.log('Signup successful', response);
        alert("Registration successful !!!")
      },
      (error) => {
        // Handle signup error here, e.g., display an error message
        console.log("name"+this.user.name);
        
        console.error('Signup error', error);
        alert("  Please fill the form carefully \n  Username must be unique \n  Email must be valid")
      }
    );
  }  

}


class User {
  name:string= ''
  email:string= ''
  password:string= ''
  username:string=''
  about:string= ''
  
}