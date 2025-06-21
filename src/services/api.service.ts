import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service'; // adjust path as needed

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: RequestMethod;
  route: string;
  body?: any;
  includeHeaders?: boolean;
  isMultipart?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  sendRequest<T>(options: RequestOptions): Observable<T> {
    if (!options.route) {
      throw new Error('URL required');
    }

    const method = options.method ?? 'GET';
    const includeHeaders = options.includeHeaders ?? true;
    const isMultipart = options.isMultipart ?? false;

    let headers = new HttpHeaders();
    if (includeHeaders) {
      const token = this.localStorageService.get<string>('access_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    if (isMultipart) {
      headers = headers.set('Content-Type', 'multipart/form-data');
    }

    const url = `${this.baseUrl}/${options.route}`;

    switch (method) {
      case 'GET':
        return this.http.get<T>(url, { headers }).pipe(
          catchError((error) => throwError(() => error))
        );

      case 'POST':
        return this.http.post<T>(url, options.body, { headers }).pipe(
          catchError((error) => throwError(() => error))
        );

      case 'PUT':
        return this.http.put<T>(url, options.body, { headers }).pipe(
          catchError((error) => throwError(() => error))
        );

      case 'DELETE':
        return this.http.delete<T>(url, { headers }).pipe(
          catchError((error) => throwError(() => error))
        );

      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
}
