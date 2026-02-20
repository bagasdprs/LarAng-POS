import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// 🔥 11 ICON WAJIB TERPAKAI SEMUA!
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
  // Terima data user yang diklik dari Parent
  @Input() detailData: any = null;

  // Kirim sinyal ke Parent
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>(); // Buat lempar ke pop-up Edit

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
    {
      action: 'Inventory',
      desc: "Updated stock for 'Organic Coffee Beans'",
      time: 'Yesterday',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      action: 'Shift',
      desc: 'Clocked out for the day (8h 15m)',
      time: 'Yesterday',
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  permissions = [
    { name: 'POS Terminal', desc: 'Full Access', granted: true },
    { name: 'Inventory', desc: 'View & Edit', granted: true },
    { name: 'Staff Mgmt', desc: 'View Only', granted: true },
    { name: 'System Settings', desc: 'No Access', granted: false },
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

  deactivateUser() {
    if (confirm(`Are you sure you want to deactivate ${this.user?.name}?`)) {
      alert('User deactivated!');
      this.closeModal();
    }
  }
}
