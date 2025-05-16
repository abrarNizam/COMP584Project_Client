import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.apiService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (err) => console.error('Error fetching profile:', err)
      });
    }
  }
}