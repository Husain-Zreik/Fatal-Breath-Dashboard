import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  imports: [FormsModule],
})
export class Landing implements AfterViewInit {
  @ViewChild('contactForm', { static: false }) contactFormRef!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled', 'shadow');
      } else {
        navbar.classList.remove('navbar-scrolled', 'shadow');
      }
    });
  }

  onSubmit(form: any): void {
    if (form.invalid) return;

    const formEl = this.contactFormRef.nativeElement as HTMLFormElement;

    // Create alert
    const alertDiv = this.renderer.createElement('div');
    this.renderer.addClass(alertDiv, 'alert');
    this.renderer.addClass(alertDiv, 'alert-success');
    this.renderer.addClass(alertDiv, 'mt-3');
    const text = this.renderer.createText(
      'Thank you for your message! We will get back to you soon.'
    );
    this.renderer.appendChild(alertDiv, text);

    // Append alert
    this.renderer.appendChild(formEl, alertDiv);

    // Reset form
    form.reset();

    // Scroll to alert
    alertDiv.scrollIntoView({ behavior: 'smooth' });

    // Remove after 5s
    setTimeout(() => {
      this.renderer.removeChild(formEl, alertDiv);
    }, 5000);
  }
}
