import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Projects } from '../models/projects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  projects: Projects[] = [];
  userId: number | null = null;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.apiService.getProjects().subscribe({
        next: (projects) => {
          if (projects && projects.length > 0) {
            this.projects = projects.filter(p => p.userId === this.userId);
          }
        },
        error: (err) => console.error('Error fetching projects:', err)
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteProject(projectId: number): void {
    if (this.userId && confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(projectId).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.projectId !== projectId);
        },
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }

}
