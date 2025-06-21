import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faChartArea,
  faHome,
  faUser,
  faBell,
  faTachometerAlt,
  faBullhorn,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  @Input() isOpen = true;
  @Input() closeSidebar!: () => void;

  // Icon bindings
  faChartArea = faChartArea;
  faHome = faHome;
  faUser = faUser;
  faBell = faBell;
  faTachometerAlt = faTachometerAlt;
  faBullhorn = faBullhorn;
  faDesktop = faDesktop;

  constructor(private router: Router, library: FaIconLibrary) {
    library.addIcons(
      faChartArea,
      faHome,
      faUser,
      faBell,
      faTachometerAlt,
      faBullhorn,
      faDesktop
    );
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  handleLinkClick() {
    if (window.innerWidth <= 768) {
      this.closeSidebar?.();
    }
  }
}
