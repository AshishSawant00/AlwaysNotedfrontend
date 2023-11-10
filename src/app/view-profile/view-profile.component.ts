import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user = {
    id: '', // Initialize with the user's ID
    name: '', // Initialize with the user's name
    email: '', // Initialize with the user's email
    about: '' // Initialize with the user's about
  };

  sessionMsg: string | null = null; // Initialize with session message or null

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {}

  updateUser() {
    // Add logic to update user data here
  }
}