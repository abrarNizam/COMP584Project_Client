import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { tap } from 'rxjs/operators'; 
import { environment } from '../../environments/environment.development'; 

interface LoginResponse {
  token: string;
  userId?: number; // Optional if backend returns it
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Match backend URL
  private tokenKey = 'authToken';
  private currentUserId: number | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
    tap(response => {
      if (response.token) {
        localStorage.setItem(this.tokenKey, response.token);
        this.currentUserId = response.userId ?? null; 
      }
    })
  );
}

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserId = null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
