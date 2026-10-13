import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  authService = inject(Auth);
  private router = inject(Router);

  isLoggingOut = false;

  onLogout() {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;

    this.authService.logout().subscribe({
      next: () => {
        this.authService.setCurrentUser(null);
        this.isLoggingOut = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        this.isLoggingOut = false;
      }
    });
  }
}
