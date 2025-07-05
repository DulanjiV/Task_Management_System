import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../../services/task.service';
import { Employee } from '../../models/employee.model';
import { Task } from '../../models/task.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: 'TODO',
    dueDate: '',
    employeeId: 0
  };
  employees: Employee[] = [];
  isEdit = false;
  dueDateObj: Date | null = null;

  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null, employees: Employee[] }
  ) { }

  ngOnInit() {
    this.employees = this.data.employees;
    if (this.data.task) {
      this.task = { ...this.data.task };
      this.isEdit = true;

      // Convert string date to Date object for the datepicker
      if (this.task.dueDate) {
        this.dueDateObj = new Date(this.task.dueDate + 'T00:00:00');
      }
    }
  }

  isValid(): boolean {
    return !!(this.task.title && this.task.description && this.task.employeeId && this.dueDateObj);
  }

  // Method to format date properly
  private formatDateToLocalString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSave() {
    if (!this.isValid()) return;

    // Convert Date object to proper string format
    if (this.dueDateObj) {
      this.task.dueDate = this.formatDateToLocalString(this.dueDateObj);
    }

    if (this.isEdit) {
      this.taskService.updateTask(this.task.id!, this.task).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.snackBar.open('Task updated successfully', 'Close', { duration: 5000 });
        },
        error: (error) => {
          console.error('Failed to update task', error);
          this.snackBar.open('Failed to update task', 'Close', { duration: 5000 });
        }
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.snackBar.open('Task created successfully', 'Close', { duration: 5000 });
        },
        error: (error) => {
          console.error('Failed to create task', error);
          this.snackBar.open('Failed to create task', 'Close', { duration: 5000 });
      }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}