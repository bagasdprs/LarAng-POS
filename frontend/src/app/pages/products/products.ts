import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroPencilSquare,
  heroEllipsisHorizontal,
  heroPlus,
  heroMagnifyingGlass,
  heroTrash,
  heroListBullet,
  heroSquares2x2,
} from '@ng-icons/heroicons/outline';
import { heroSquares2x2Mini, heroListBulletMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent, RouterLink],
  viewProviders: [
    provideIcons({
      heroPencilSquare,
      heroEllipsisHorizontal,
      heroPlus,
      heroMagnifyingGlass,
      heroSquares2x2Mini,
      heroSquares2x2,
      heroListBulletMini,
      heroListBullet,
      heroTrash,
    }),
  ],
  templateUrl: './products.html',
})
export class Products {
  // Filter Kategori
  categories = ['All Items', 'Beverages', 'Food', 'Snacks', 'Dessert'];
  selectedCategory = 'All Items';
  viewMode: 'grid' | 'list' = 'grid'; // Buat toggle tampilan nanti
  activeMenuId: string | null = null; // Buat nyimpen ID produk mana yang menu-nya lagi kebuka

  // Data Dummy sesuai Design
  products = [
    {
      id: '1',
      name: 'Caramel Macchiato',
      category: 'Beverage',
      price: 4.5,
      stock: 150,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      category: 'Food',
      price: 12.0,
      stock: 3,
      status: 'Low Stock',
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '3',
      name: 'Cheesecake Slice',
      category: 'Dessert',
      price: 5.75,
      stock: 45,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '4',
      name: 'Mojito Fresh',
      category: 'Beverage',
      price: 8.0,
      stock: 20,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '5',
      name: 'Classic Beef Burger',
      category: 'Food',
      price: 9.5,
      stock: 12,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '6',
      name: 'Caesar Salad',
      category: 'Food',
      price: 7.25,
      stock: 32,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '7',
      name: 'Mushroom Swiss',
      category: 'Food',
      price: 10.5,
      stock: 88,
      status: 'In Stock',
      image:
        'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '8',
      name: 'Fresh Lemonade',
      category: 'Beverage',
      price: 3.5,
      stock: 5,
      status: 'Low Stock',
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
    },
  ];

  toggleMenu(productId: string, event: Event) {
    event.stopPropagation(); // Biar gak nge-trigger klik card
    if (this.activeMenuId === productId) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = productId;
    }
  }

  // Klik di mana aja buat nutup menu
  closeMenu() {
    this.activeMenuId = null;
  }
}
