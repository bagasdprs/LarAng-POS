import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';

  // Fungsi Register
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Fungsi Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Simpan Token di Browser
  saveToken(token: string) {
    localStorage.setItem('larang_pos_token', token);
  }

  // Ambil Token
  getToken() {
    return localStorage.getItem('larang_pos_token');
  }

  removeToken() {
    localStorage.removeItem('larang_pos_token');
  }
}
