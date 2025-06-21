// overview.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class Overview {
  stats = {
    houses: 3,
    rooms: 9,
    alertsToday: 2,
    unsafeRooms: 1,
  };

  recentAlerts = [
    { id: 1, room: 'Kitchen', level: 85, time: '10:15 AM' },
    { id: 2, room: 'Garage', level: 78, time: '08:45 AM' },
  ];

  announcements = [
    { id: 1, title: 'Sensor maintenance today', time: 'Today - 9:00 AM' },
    { id: 2, title: 'New CO threshold updated', time: 'Yesterday - 3:00 PM' },
  ];
}
