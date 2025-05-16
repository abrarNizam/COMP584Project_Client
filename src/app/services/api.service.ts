import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { Projects } from '../models/projects';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl; ;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Fetch all projects
  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`${this.apiUrl}/Project`);
  }

  // Fetch a specific project by ID
  getProject(id: number): Observable<Projects> {
    return this.http.get<Projects>(`${this.apiUrl}/Project/${id}`);
  }

  // Fetch all user profiles
  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}/UserProfile`);
  }

  // Fetch a specific user profile by ID
  getUserProfile(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/UserProfile/${id}`);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Project/${id}`, { headers: this.getAuthHeaders() });
  }

}
