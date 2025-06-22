import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- add this
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Sidebar],
  templateUrl: './manager-layout.html',
  styleUrls: ['./manager-layout.scss'],
})
export class ManagerLayout {
  isSidebarOpen = false;
  pageTitle = 'Dashboard';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.pageTitle = data['title'] || 'Dashboard';
      });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.closeSidebar();
    }
  }

  get innerWidth(): number {
    return window.innerWidth;
  }
}
