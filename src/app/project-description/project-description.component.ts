import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Projects } from '../models/projects';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent implements OnInit{

  userId: number;
  projects: Projects[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
  }

  ngOnInit(): void {
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        if (projects && projects.length > 0) {
          this.projects = projects.filter(p => p.userId === this.userId);
        }
      },
      error: (err) => console.error('Error fetching projects:', err)
    });
  }

}
