import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroPencilSquare,
  heroEyeSlash,
  heroBanknotes,
  heroCube,
  heroMagnifyingGlass,
  heroEllipsisVertical,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroArrowLeft,
      heroPencilSquare,
      heroEyeSlash,
      heroBanknotes,
      heroCube,
      heroMagnifyingGlass,
      heroEllipsisVertical,
    }),
  ],
  templateUrl: './category-detail.html',
})
export class CategoryDetail implements OnInit {
  private route = inject(ActivatedRoute);
  categoryId: string | null = null;

  // Data Kategori
  category = {
    id: 'CAT-001',
    name: 'Hot Beverages',
    description:
      'Premium selection of hand-crafted coffees, artisanal teas, and warm seasonal specialties served fresh daily.',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80',
    status: true,
    revenue: 12450,
    totalItems: 24,
  };

  // Data Tabel Produk di dalam Kategori ini
  products = [
    {
      id: 1,
      name: 'Caramel Macchiato',
      price: 4.5,
      stock: 'High',
      stockColor: 'text-green-600 bg-green-50',
      status: true,
    },
    {
      id: 2,
      name: 'Vanilla Latte',
      price: 4.25,
      stock: 'Low',
      stockColor: 'text-orange-600 bg-orange-50',
      status: true,
    },
    {
      id: 3,
      name: 'Earl Grey Tea',
      price: 3.0,
      stock: 'High',
      stockColor: 'text-green-600 bg-green-50',
      status: true,
    },
    {
      id: 4,
      name: 'Double Espresso',
      price: 2.5,
      stock: 'Out',
      stockColor: 'text-red-600 bg-red-50',
      status: false,
    },
  ];

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    // Nanti fetch data dari database berdasarkan this.categoryId di sini
  }

  toggleStatus() {
    this.category.status = !this.category.status;
    alert(`Status kategori diubah menjadi: ${this.category.status ? 'Active' : 'Hidden'}`);
  }
}
