import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthProvider {
  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) {}

  register(
    name: string,
    username: string,
    email: string,
    password: string,
    role: string | null
  ): Observable<any> {
    return this.api.sendRequest<any>({
      method: 'POST',
      route: 'auth/register',
      body: { name, username, email, password, role: role ?? '1' }
    }).pipe(
      tap((response) => {
        this.localStorage.set('access_token', response.user.token);
        this.localStorage.set('user_data', response.user);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.api.sendRequest<any>({
      method: 'POST',
      route: 'auth/login',
      body: { email, password },
    }).pipe(
      tap((response) => {
        this.localStorage.set('access_token', response.user.token);
        this.localStorage.set('user_data', response.user);
      })
    );
  }
}
