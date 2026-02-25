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
  heroUser,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ heroEnvelope, heroLockClosed, heroEye, heroEyeSlash, heroUser })],
  templateUrl: './register.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // 👇 FUNGSI PENGECEKAN PASSWORD 👇
  get hasMinLength() {
    return this.password.length >= 8;
  }
  get hasUpper() {
    return /[A-Z]/.test(this.password);
  }
  get hasNumber() {
    return /[0-9]/.test(this.password);
  }
  get hasSymbol() {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.password);
  }

  // Fungsi untuk ngecek apakah semua syarat udah terpenuhi
  get isPasswordValid() {
    return this.hasMinLength && this.hasUpper && this.hasNumber && this.hasSymbol;
  }

  onRegister() {
    if (this.password !== this.confirmPassword || !this.isPasswordValid) {
      return; // Jaga-jaga dicegat lagi
    }

    this.isLoading = true;

    // Siapkan data sesuai kebutuhan API Laravel
    const payload = {
      name: this.fullName,
      email: this.email,
      password: this.password,
    };

    // Tembak API
    this.authService.register(payload).subscribe({
      next: (res: any) => {
        console.log('Register Sukses!', res);

        // Simpan token dari Laravel ke LocalStorage
        this.authService.saveToken(res.access_token);

        alert('Registrasi Berhasil! Selamat datang di Larang POS.');
        this.isLoading = false;

        // Langsung lempar ke Dashboard setelah sukses
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Register Gagal:', err);
        // Tampilkan error dari Laravel (misal email udah dipakai)
        alert(err.error?.message || 'Registrasi Gagal! Cek console log.');
        this.isLoading = false;
      },
    });
  }
}
