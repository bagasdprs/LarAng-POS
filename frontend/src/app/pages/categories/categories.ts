import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroEllipsisVertical,
  heroPlus,
  heroMagnifyingGlass,
  heroSparkles,
  heroCube,
  heroEye,
  heroPencilSquare,
  heroTrash,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroEllipsisVertical,
      heroPlus,
      heroMagnifyingGlass,
      heroSparkles,
      heroCube,
      heroEye,
      heroPencilSquare,
      heroTrash,
    }),
  ],
  templateUrl: './categories.html',
})
export class Categories {
  activeMenuId: string | null = null;

  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId === id) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = id;
    }
  }

  closeMenu() {
    this.activeMenuId = null;
  }

  // Data Dummy Kategori dengan Status Stok Agregat
  categories = [
    {
      id: '1',
      name: 'Hot Beverages',
      count: 24,
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80',
      stockStatus: 'Safe', // Aman
      lowStockCount: 0,
    },
    {
      id: '2',
      name: 'Artisan Bakery',
      count: 12,
      image:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
      stockStatus: 'Alert', // Bahaya
      lowStockCount: 3, // Ada 3 roti mau abis
    },
    {
      id: '3',
      name: 'Fresh Salads',
      count: 8,
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
      stockStatus: 'Safe',
      lowStockCount: 0,
    },
    {
      id: '4',
      name: 'Fine Desserts',
      count: 15,
      image:
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80',
      stockStatus: 'Safe',
      lowStockCount: 0,
    },
    {
      id: '5',
      name: 'Cold Press',
      count: 10,
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
      stockStatus: 'Alert',
      lowStockCount: 2,
    },
    {
      id: '6',
      name: 'Merch & Tools',
      count: 45,
      image:
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80',
      stockStatus: 'Safe',
      lowStockCount: 0,
    },
  ];

  // Data Insight di Bawah (Bonus Fitur Keren)
  insights = [
    {
      label: 'Top Performing',
      value: 'Hot Beverages',
      icon: 'heroSparkles',
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Total Items',
      value: '114 SKUs',
      icon: 'heroCube',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      label: 'Most Viewed',
      value: 'Artisan Bakery',
      icon: 'heroEye',
      color: 'bg-blue-100 text-blue-700',
    },
  ];
}
