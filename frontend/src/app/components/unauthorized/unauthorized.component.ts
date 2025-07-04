import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.css']
})

export class UnauthorizedComponent implements OnInit {
  attemptedUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the attempted URL from query parameters
    this.route.queryParams.subscribe(params => {
      this.attemptedUrl = params['attemptedUrl'] || '';
      console.log('Unauthorized access attempted for:', this.attemptedUrl);
    });
  }

  goToLogin() {
    // Navigate to login with return URL if available
    if (this.attemptedUrl) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.attemptedUrl } 
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}