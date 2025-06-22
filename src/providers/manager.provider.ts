import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { House } from '../models/house.model';
import { Room } from '../models/room.model';
import { User } from '../models/user.model';

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

  loadHouses(): Observable<{ houses: House[] }> {
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

  deleteMember(houseId: number, userId: number): Observable<any> {
    return this.api.sendRequest({
      method: 'DELETE',
      route: `user/manager/houses/${houseId}/members/${userId}`,
    });
  }

  getMembers(): Observable<User[]> {
    return this.api
      .sendRequest<{ members: User[] }>({
        method: 'GET',
        route: 'user/admin/members',
      })
      .pipe(map((response) => response.members));
  }

  loadRoomsFromAdminHouses(houseId: number): Observable<Room[]> {
    return this.api
      .sendRequest<{ houses: House[] }>({
        method: 'GET',
        route: 'user/admin/get-houses',
      })
      .pipe(
        map((response: { houses: House[] }) => {
          const house = response.houses.find((h) => h.id === houseId);
          return (
            house?.rooms?.map((room) => ({
              ...room,
              houseName: house.name,
            })) || []
          );
        })
      );
  }
}
