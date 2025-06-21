import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthProvider } from '../../../../providers/auth.provider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private authProvider: AuthProvider) {}

  handleSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authProvider.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        // On success, navigate to secured route
        this.router.navigate(['/overview']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }

  goToSignUp(): void {
    this.router.navigate(['/register']);
  }
}
