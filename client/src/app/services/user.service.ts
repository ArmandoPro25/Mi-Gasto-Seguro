import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { ApiResponse } from '../interfaces/apiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URI = 'http://localhost:3000/api/user'; // Backend

  constructor(private http: HttpClient) { }

  register(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URI}`, user);
  }

  verifyEmail(email: string, code: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URI}/verify-email`, { email, code });
  }

  authenticate(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URI}/authenticate`, { username, password });
  }

  updateTypeUser(Id_User: string, Type_User: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API_URI}/type/${Id_User}`, { Type_User });
  }

  checkEmailExists(email: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URI}/check-email`, { params: { email } });
  }

  sendPasswordRecoveryEmail(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URI}/send-recovery-email`, { email });
  }
  
  verifyRecoveryCode(email: string, code: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URI}/verify-recovery-code`, { params: { email, code } });
  }

  updatePassword(email: string, newPass: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API_URI}/update-password`, { email, newPass });
  }
  
}
