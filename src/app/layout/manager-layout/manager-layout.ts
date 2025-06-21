import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './manager-layout.html',
  styleUrls: ['./manager-layout.scss'],
})
export class ManagerLayout {
  isSidebarOpen = false;

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
