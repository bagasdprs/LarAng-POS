import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroEnvelope,
  heroLockClosed,
  heroEye,
  heroEyeSlash,
  heroCheck,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ heroEnvelope, heroLockClosed, heroEye, heroEyeSlash, heroCheck })],
  templateUrl: './login.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);

  email = '';
  password = '';
  showPassword = false;
  isLoading = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.email || !this.password) return;

    console.log('Login attempt:', this.email); // Sengaja password gak di-log demi keamanan
    this.isLoading = true;

    // Siapkan data payload
    const payload = {
      email: this.email,
      password: this.password,
    };

    // Tembak API Login
    this.authService.login(payload).subscribe({
      next: (res: any) => {
        console.log('Login Sukses!', res);

        // 1. Simpan token dari Laravel ke Browser
        this.authService.saveToken(res.access_token);

        this.isLoading = false;

        // 2. Langsung tendang ke halaman Dashboard!
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login Gagal:', err);
        // Tampilkan error (misal password salah)
        alert(err.error?.message || 'Login Gagal! Kredensial salah.');
        this.isLoading = false;
      },
    });
  }
}
