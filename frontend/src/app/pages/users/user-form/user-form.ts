import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroXMark,
  heroIdentification,
  heroEye,
  heroEyeSlash,
  heroShieldCheck,
  heroPaperAirplane,
} from '@ng-icons/heroicons/outline';

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
    }),
  ],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  @Input() editData: any = null;
  @Output() close = new EventEmitter<void>();

  isEditMode = false;
  showPassword = false;

  user: any = {
    fullName: '',
    email: '',
    password: '',
    role: 'Manager',
  };

  permissions: any = {
    Admin: [
      { name: 'Full System Access', desc: 'Can access and modify all settings', checked: true },
    ],
    Manager: [
      { name: 'Access POS Register', desc: 'Can process transactions', checked: true },
      { name: 'View Daily Sales', desc: 'Access to daily reports', checked: true },
    ],
    Cashier: [{ name: 'Access POS Register', desc: 'Can process transactions', checked: true }],
  };

  ngOnInit() {
    if (this.editData) {
      this.isEditMode = true;
      this.user = { ...this.editData, password: '' };
    }
  }

  get currentPermissions() {
    return this.permissions[this.user.role];
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

  saveUser() {
    alert(`User ${this.user.fullName} berhasil ${this.isEditMode ? 'diupdate' : 'diinvite'}!`);
    this.closeModal();
  }
}
