import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
import { ProductService } from '../../services/product';

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
export class Products implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  categories: string[] = ['All Items'];
  selectedCategory = 'All Items';
  viewMode: 'grid' | 'list' = 'grid';
  activeMenuId: string | null = null;

  products: any[] = [];
  isLoading: boolean = true;

  get filteredProducts() {
    if (this.selectedCategory === 'All Items') {
      return this.products;
    }
    return this.products.filter((p) => p.category === this.selectedCategory);
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.products = response.data.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            category: p.category ? p.category.name : 'Uncategorized',
            price: Number(p.price),
            stock: Number(p.stock),
            status: Number(p.stock) <= 10 ? 'Low Stock' : 'In Stock',
            image:
              p.image_url ||
              'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80',
          }));

          const uniqueCategories = Array.from(new Set(this.products.map((p) => p.category)));
          this.categories = ['All Items', ...uniqueCategories];

          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        console.error('❌ Gagal menarik data produk:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleMenu(productId: string, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId === productId) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = productId;
    }
  }

  closeMenu() {
    this.activeMenuId = null;
  }
}
