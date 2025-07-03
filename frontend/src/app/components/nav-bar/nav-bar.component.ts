import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule  } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
