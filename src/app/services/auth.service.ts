import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
  const body = new HttpParams()
    .set('username', username)
    .set('password', password);

  return this.http.post('http://localhost:8080/api/login', body.toString(), {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    withCredentials: true
  });
}

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  getUserInfo() {
    return this.http.get(`${this.apiUrl}/user`, {
      withCredentials: true,
    });
  }
}
