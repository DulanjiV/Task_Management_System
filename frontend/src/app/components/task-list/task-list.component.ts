import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task.model';
import { Employee } from '../../models/employee.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  employees: Employee[] = [];
  displayedColumns: string[] = ['title', 'description', 'status', 'dueDate', 'employee', 'actions'];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadTasks();
    this.loadEmployees();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => this.snackBar.open('Failed to load tasks', 'Close', { duration: 5000 })
    });
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => this.employees = employees,
      error: (error) => console.error('Failed to load employees', error)
    });
  }

  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  }

  openTaskForm(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: { task: task || null, employees: this.employees }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  editTask(task: Task) {
    this.openTaskForm(task);
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
          this.snackBar.open('Task deleted successfully', 'Close', { duration: 5000 });
        },
        error: (error) => this.snackBar.open('Failed to delete task', 'Close', { duration: 5000 })
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}