import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8000/api';

  // Fungsi untuk nyisipin Token ke dalam Request
  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 1. Ambil semua data user
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  // 2. Setujui user jadi Kasir
  approveKasir(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/approve`, {}, { headers: this.getHeaders() });
  }

  // 3. Tambah User Baru (Create)
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data, { headers: this.getHeaders() });
  }

  // 4. Edit User (Update)
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data, { headers: this.getHeaders() });
  }
}
