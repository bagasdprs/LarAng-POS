import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroCheck,
  heroCloudArrowUp,
  heroTrash,
  heroEllipsisVertical,
  heroPlus,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  // SEMUA ICON DI BAWAH INI WAJIB TERPAKAI DI HTML!
  viewProviders: [
    provideIcons({
      heroArrowLeft,
      heroCheck,
      heroCloudArrowUp,
      heroTrash,
      heroEllipsisVertical,
      heroPlus,
    }),
  ],
  templateUrl: './category-form.html',
})
export class CategoryForm implements OnInit {
  private route = inject(ActivatedRoute);
  categoryId = this.route.snapshot.paramMap.get('id');

  // Deteksi: Apakah ini Add New atau Edit?
  isEditMode = !!this.categoryId;

  // Data Kategori Default (Kosong untuk Add New)
  category: any = {
    name: '',
    displayOrder: 1,
    description: '',
    icon: null,
    background: '#EBD5AB', // Default beige texture color
    status: true,
    schedule: 'always', // 'always' atau 'specific'
  };

  ngOnInit() {
    if (this.isEditMode) {
      this.loadDummyDataForEdit();
    }
  }

  loadDummyDataForEdit() {
    this.category = {
      name: 'Hot Beverages',
      displayOrder: 1,
      description:
        'Premium coffee selections including espresso, latte, cappuccino, and seasonal hot drinks.',
      icon: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80',
      background: '#EBD5AB',
      status: true,
      schedule: 'always',
      itemCount: 24, // Ekstra data untuk preview card
    };
  }

  removeIcon() {
    this.category.icon = null;
  }

  saveCategory() {
    const actionText = this.isEditMode ? 'diupdate' : 'dibuat';
    alert(`Simulasi: Kategori "${this.category.name}" berhasil ${actionText}!`);
  }

  deleteCategory() {
    if (confirm(`Yakin ingin menghapus kategori ${this.category.name}?`)) {
      alert('Simulasi: Kategori dihapus!');
    }
  }
}
