import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Adjust if needed

  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password, role }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }

  createProject(project: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add the token
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}/projects`, project, { headers });
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${id}`);
  }
}
