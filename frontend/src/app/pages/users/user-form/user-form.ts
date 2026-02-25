import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// 👇 Tambahkan heroCheckCircle untuk list permission
import {
  heroXMark,
  heroIdentification,
  heroEye,
  heroEyeSlash,
  heroShieldCheck,
  heroPaperAirplane,
  heroCheckCircle,
} from '@ng-icons/heroicons/outline';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroXMark,
      heroIdentification,
      heroEye,
      heroEyeSlash,
      heroShieldCheck,
      heroPaperAirplane,
      heroCheckCircle,
    }),
  ],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  private userService = inject(UserService);

  @Input() editData: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  isEditMode = false;
  showPassword = false;

  // Default ke Kasir
  user: any = { fullName: '', email: '', password: '', role: 'Kasir' };

  // Permission diubah jadi text informasi, bukan checkbox
  permissions: any = {
    Admin: [
      {
        name: 'Akses Penuh (Super Admin)',
        desc: 'Dapat mengelola User, Master Data, dan Transaksi.',
      },
    ],
    CEO: [
      {
        name: 'Akses Pantau (Dashboard)',
        desc: 'Hanya dapat melihat Laporan dan Statistik Keuangan.',
      },
    ],
    Kasir: [
      {
        name: 'Akses Mesin Kasir (POS)',
        desc: 'Hanya dapat melakukan proses transaksi penjualan.',
      },
    ],
  };

  ngOnInit() {
    if (this.editData) {
      this.isEditMode = true;
      const roleName = this.editData.role_name || this.editData.role || 'Kasir';

      this.user = {
        fullName: this.editData.name,
        email: this.editData.email,
        role: roleName === 'Menunggu Approval' ? 'Kasir' : roleName,
        password: '',
      };
    }
  }

  get currentPermissions() {
    return this.permissions[this.user.role] || this.permissions['Kasir'];
  }
  setRole(selectedRole: string) {
    this.user.role = selectedRole;
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  closeModal() {
    this.close.emit();
  }

  // ==========================================
  // IMPLEMENTASI 4 FUNCTION: SAVE / SUBMIT DATA
  // ==========================================

  // Function 1: Trigger
  onSubmitForm() {
    if (!this.user.fullName || !this.user.email) {
      alert('Nama dan Email wajib diisi ya, Komandan!');
      return;
    }
    this.processSaving();
  }

  // Function 2: Proses API
  private processSaving() {
    if (this.isEditMode) {
      // PROSES EDIT
      this.userService.updateUser(this.editData.id, this.user).subscribe({
        next: (res) => this.handleSaveSuccess(),
        error: (err) => this.handleSaveError(err),
      });
    } else {
      // PROSES CREATE
      if (!this.user.password) {
        alert('Password wajib diisi untuk user baru!');
        return;
      }
      this.userService.createUser(this.user).subscribe({
        next: (res) => this.handleSaveSuccess(),
        error: (err) => this.handleSaveError(err),
      });
    }
  }

  // Function 3: Sukses
  private handleSaveSuccess() {
    alert(`Sukses! User ${this.user.fullName} siap diproses!`);
    this.refresh.emit();
    this.closeModal();
  }

  // Function 4: Gagal
  private handleSaveError(err: any) {
    console.error('Gagal:', err);
    alert(err.error?.message || 'Waduh, gagal menyimpan data! Coba cek koneksi.');
  }
}
