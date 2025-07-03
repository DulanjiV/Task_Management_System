import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8083/tasks';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}