import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Projects } from '../models/projects';
import { UserProfile } from '../models/user-profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  userProfiles: UserProfile[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getUserProfiles().subscribe({
      next: (profiles) => {
        if (profiles && profiles.length > 0) {
          this.userProfiles = profiles;
        }
      },
      error: (err) => console.error('Error fetching user profiles:', err)
    });
  }

  goToProjectDescription(userId: number): void {
    this.router.navigate(['/project-description', userId]);
  }

}
