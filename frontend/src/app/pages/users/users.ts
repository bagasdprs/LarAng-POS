import { Component } from '@angular/core';
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
export class Users {
  viewMode: 'grid' | 'list' = 'grid';
  activeFilter: string = 'All Roles';
  searchQuery: string = '';

  users = [
    {
      id: 'USR-001',
      name: 'Sarah Jenkins',
      email: 'sarah.j@larangpos.com',
      role: 'Store Manager',
      status: true,
      lastLogin: '2 min ago',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'USR-002',
      name: 'Mike Ross',
      email: 'mike.ross@larangpos.com',
      role: 'Cashier',
      status: true,
      lastLogin: '1 hour ago',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'USR-003',
      name: 'Elena Fisher',
      email: 'elena.f@larangpos.com',
      role: 'Admin',
      status: false,
      lastLogin: '5 days ago',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'USR-004',
      name: 'David Chen',
      email: 'david.c@larangpos.com',
      role: 'Sales Associate',
      status: true,
      lastLogin: '10 mins ago',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  // ================= MODAL ADD/EDIT STATE =================
  isModalOpen = false;
  selectedUserForEdit: any = null;

  // ================= MODAL DETAIL STATE =================
  isDetailModalOpen = false;
  selectedUserForDetail: any = null;

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
