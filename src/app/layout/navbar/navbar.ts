import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule], // Import FontAwesomeModule here
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  @Input() isOpen = false;
  @Input() title: string = 'Dashboard';
  @Input() toggleSidebar!: () => void;

  constructor(library: FaIconLibrary) {
    library.addIcons(faBars, faTimes);
  }
}
