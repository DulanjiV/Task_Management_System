import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponse, RefreshTokenResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$ = this.loggedInSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/refresh`, { refreshToken });
  }

  loginUser(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    this.loggedInSubject.next(true);
  }

  updateTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== '';
  }
  
  logout(): void {
    // Call logout endpoint if token exists
    const token = this.getToken();
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
        responseType: 'text'
      }).subscribe({
        next: () => console.log('Logged out from server'),
        error: (error) => console.error('Logout error:', error)
      });
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.loggedInSubject.next(false);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}