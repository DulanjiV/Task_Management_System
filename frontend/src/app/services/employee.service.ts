import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8082/employees';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
