import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthProvider } from '../../../../providers/auth.provider';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup {
  name = '';
  username = '';
  email = '';
  password = '';
  role: string | null = null;
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthProvider) {}

  handleSubmit(): void {
    this.errorMessage = '';

    const validationError = this.validateForm();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    this.loading = true;

    this.auth
      .register(this.name, this.username, this.email, this.password, this.role)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage =
            err?.error?.message || 'Registration failed. Please try again.';
        },
      });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }

  private validateForm(): string | null {
    if (
      !this.name.trim() ||
      !this.username.trim() ||
      !this.email.trim() ||
      !this.password.trim()
    ) {
      return 'All fields are required.';
    }

    if (!this.validateEmail(this.email)) {
      return 'Please enter a valid email address.';
    }

    if (this.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    return null; // No errors
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
