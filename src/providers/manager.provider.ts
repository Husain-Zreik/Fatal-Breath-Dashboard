import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerProvider {
  constructor(private api: ApiService) {}

  createHouse(name: string, city: string, country: string): Observable<any> {
    return this.api.sendRequest({
      method: 'POST',
      route: 'user/admin/add-house',
      body: { name, city, country },
    });
  }

  loadHouses(): Observable<any> {
    return this.api.sendRequest({
      method: 'GET',
      route: 'user/admin/get-houses',
    });
  }

  createRoom(name: string, house_id: number, type: string): Observable<any> {
    return this.api.sendRequest({
      method: 'POST',
      route: 'user/admin/add-room',
      body: { name, house_id, type },
    });
  }

  loadRooms(): Observable<any> {
    return this.api.sendRequest({
      method: 'GET',
      route: 'user/admin/get-rooms',
    });
  }

  deleteRoom(roomId: number): Observable<any> {
    return this.api.sendRequest({
      method: 'DELETE',
      route: `user/admin/room/${roomId}`,
    });
  }

  deleteHouse(houseId: number): Observable<any> {
    return this.api.sendRequest({
      method: 'DELETE',
      route: `user/admin/house/${houseId}`,
    });
  }

  loadRoomsFromAdminHouses(houseId: number): Observable<any[]> {
    return this.api.sendRequest({
      method: 'GET',
      route: 'user/admin/get-houses',
    }).pipe(
      map((response: any) => {
        const houses = response.houses || [];
        const house = houses.find((h: any) => h.id === houseId);

        if (!house) return [];

        return house.rooms.map((room: any) => ({
          ...room,
          houseName: house.name,
        }));
      })
    );
  }
}
