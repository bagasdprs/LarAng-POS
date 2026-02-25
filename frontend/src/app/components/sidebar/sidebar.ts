import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

// 👇 JANGAN LUPA: Import icon yang kamu pakai di sidebar ke mari ya
import {
  heroArrowRightOnRectangle,
  heroSquares2x2,
  heroCube,
  heroTag,
  heroUsers,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  // 👇 Tambahkan NgIconComponent ke dalam imports biar iconnya muncul!
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIconComponent],
  // 👇 Daftarkan icon-iconnya di viewProviders
  viewProviders: [
    provideIcons({
      heroArrowRightOnRectangle,
      heroSquares2x2,
      heroCube,
      heroTag,
      heroUsers,
    }),
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // ==========================================
  // 1. DEKLARASI INJECTION & VARIABEL
  // ==========================================
  private authService = inject(AuthService); // Buat manggil API Logout
  private router = inject(Router); // Buat pindah ke halaman Login

  // Variabel untuk nyimpen status sidebar (buka/tutup)
  isSidebarOpen: boolean = true;

  // ==========================================
  // 2. FUNGSI UI SIDEBAR
  // ==========================================
  // Fungsi untuk mengubah status buka/tutup
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ==========================================
  // 3. FUNGSI IMPLEMENTASI LOGOUT (4 TAHAP)
  // ==========================================

  // Function 1: Trigger utama saat profil/tombol diklik
  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.handleLogoutSuccess(),
      error: (err) => this.handleLogoutError(err),
    });
  }

  // Function 2: Penanganan jika respon API sukses
  private handleLogoutSuccess() {
    console.log('Berhasil pamitan ke server Laravel!');
    this.clearSessionAndRedirect();
  }

  // Function 3: Penanganan jika API gagal (misal server mati / token kadaluarsa)
  private handleLogoutError(err: any) {
    console.error('Server gagal merespon logout, tapi tetap dipaksa keluar:', err);
    this.clearSessionAndRedirect();
  }

  // Function 4: Eksekusi pembersihan token di browser & pindah halaman
  private clearSessionAndRedirect() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
