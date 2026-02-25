import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroXMark,
  heroUser,
  heroEnvelope,
  heroPhone,
  heroCalendar,
  heroBuildingOffice,
  heroExclamationTriangle,
  heroLockClosed,
  heroCheckCircle,
  heroClock,
  heroPencilSquare,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroXMark,
      heroUser,
      heroEnvelope,
      heroPhone,
      heroCalendar,
      heroBuildingOffice,
      heroExclamationTriangle,
      heroLockClosed,
      heroCheckCircle,
      heroClock,
      heroPencilSquare,
    }),
  ],
  templateUrl: './user-detail.html',
})
export class UserDetail implements OnInit {
  @Input() detailData: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();

  user: any = null;

  // Data Dummy Audit Log & Permissions
  auditLogs = [
    {
      action: 'Login',
      desc: 'Successful login from IP 192.168.1.45',
      time: '2 mins ago',
      color: 'bg-gray-100 text-gray-600',
    },
    {
      action: 'Sale',
      desc: 'Processed order #ORD-8821 ($145.50)',
      time: '1 hour ago',
      color: 'bg-green-100 text-green-700',
    },
  ];
  permissions = [
    { name: 'POS Terminal', desc: 'Full Access', granted: true },
    { name: 'Inventory', desc: 'View & Edit', granted: true },
  ];

  ngOnInit() {
    if (this.detailData) {
      this.user = this.detailData;
    }
  }

  closeModal() {
    this.close.emit();
  }
  openEdit() {
    this.edit.emit(this.user);
  }

  // ==========================================
  // IMPLEMENTASI 4 FUNCTION: DEACTIVATE/DELETE
  // ==========================================

  // Function 1: Trigger saat tombol Deactivate diklik (Munculin peringatan)
  onDeactivateClick() {
    if (confirm(`⚠️ PERINGATAN! Yakin ingin menonaktifkan akses untuk ${this.user?.name}?`)) {
      this.processDeactivation();
    }
  }

  // Function 2: Proses Eksekusi (Siap diganti panggil API Delete Laravel)
  private processDeactivation() {
    console.log('Mengeksekusi penonaktifan untuk user ID:', this.user?.id);

    // Simulasi proses API
    setTimeout(() => {
      const isSuccess = true;
      if (isSuccess) {
        this.handleDeactivationSuccess();
      } else {
        this.handleDeactivationError(new Error('Gagal merespon server database.'));
      }
    }, 500);
  }

  // Function 3: Penanganan jika API Sukses
  private handleDeactivationSuccess() {
    alert(`Akses untuk ${this.user?.name} telah dicabut secara permanen!`);
    this.closeModal();
  }

  // Function 4: Penanganan jika API Gagal
  private handleDeactivationError(err: any) {
    console.error('Gagal menonaktifkan user:', err);
    alert('Operasi gagal! Silakan coba lagi beberapa saat.');
  }
}
