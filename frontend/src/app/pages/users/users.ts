import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // 👈 Tambahkan OnInit & inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroPlus,
  heroMagnifyingGlass,
  heroSquares2x2,
  heroListBullet,
  heroCheckCircle,
  heroEllipsisVertical,
  heroClock,
  heroPencilSquare,
  heroEye,
} from '@ng-icons/heroicons/outline';

import { UserForm } from './user-form/user-form';
import { UserDetail } from './user-detail/user-detail';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent, UserForm, UserDetail],
  viewProviders: [
    provideIcons({
      heroPlus,
      heroMagnifyingGlass,
      heroSquares2x2,
      heroListBullet,
      heroCheckCircle,
      heroEllipsisVertical,
      heroClock,
      heroPencilSquare,
      heroEye,
    }),
  ],
  templateUrl: './users.html',
})
export class Users implements OnInit {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  viewMode: 'grid' | 'list' = 'list';
  activeFilter: string = 'All Roles';
  searchQuery: string = '';

  users: any[] = [];
  isLoading = true;

  // Modal States
  isModalOpen = false;
  selectedUserForEdit: any = null;
  isDetailModalOpen = false;
  selectedUserForDetail: any = null;

  // ==========================================
  // JALANKAN SAAT HALAMAN DIBUKA
  // ==========================================
  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data.map((user: any) => ({
          ...user,
          role: user.role_name ? user.role_name : 'Menunggu Approval',
          avatar: `https://ui-avatars.com/api/?name=${user.name}&background=EBD5AB&color=1B211A`,
          status: user.role_id !== null,
        }));
        this.isLoading = false;
        console.log('Data User Asli:', this.users);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Gagal ambil data user:', err);
        this.isLoading = false;
      },
    });
  }

  // Fungsi Approve Kasir
  approveUser(userId: number) {
    if (confirm('Yakin ingin menyetujui user ini sebagai Kasir?')) {
      this.userService.approveKasir(userId).subscribe({
        next: (res) => {
          alert('User berhasil di-approve!');
          this.fetchUsers();
        },
        error: (err) => {
          alert('Gagal meng-approve user!');
          console.error(err);
        },
      });
    }
  }

  // ==========================================
  // FUNGSI UI BAWAAN KAMU (GAK DIUBAH)
  // ==========================================
  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
  setFilter(role: string) {
    this.activeFilter = role;
  }
  openAddModal() {
    this.selectedUserForEdit = null;
    this.isModalOpen = true;
  }
  openEditModal(user: any) {
    this.selectedUserForEdit = user;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedUserForEdit = null;
  }
  openDetailModal(user: any) {
    this.selectedUserForDetail = user;
    this.isDetailModalOpen = true;
  }
  closeDetailModal() {
    this.isDetailModalOpen = false;
    this.selectedUserForDetail = null;
  }
  switchToEditModal(user: any) {
    this.closeDetailModal();
    this.openEditModal(user);
  }
}
