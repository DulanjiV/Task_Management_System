import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit() {
    if (!this.username || !this.password) {
      this.snackBar.open('Please enter username and password', 'Close', { duration: 5000 });
      return;
    }

    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.loginUser(response.token, response.refreshToken);
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  onReset() {
    this.username = '';
    this.password = '';
  }
}