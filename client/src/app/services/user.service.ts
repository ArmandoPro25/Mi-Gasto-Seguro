import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URI = 'http://localhost:3000/api/user'; // Backend

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/authenticate`, { username, password });
  }
}
