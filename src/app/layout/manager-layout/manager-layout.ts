import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-manager-layout',
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './manager-layout.html',
  styleUrl: './manager-layout.scss'
})
export class ManagerLayout {

}
