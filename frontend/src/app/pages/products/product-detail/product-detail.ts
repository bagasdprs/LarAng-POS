import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroPencilSquare,
  heroShare,
  heroHeart,
  heroCheckBadge,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { ProductService } from '../../../services/product';

// -------------------------------------------------------------------
// 1. FUNCTION DECLARATION
// -------------------------------------------------------------------
function generateStatusLabel(stock: number): string {
  if (stock > 10) return 'IN STOCK';
  if (stock > 0) return 'LOW STOCK';
  return 'OUT OF STOCK';
}

// -------------------------------------------------------------------
// 2. FUNCTION EXPRESSION
// Helper untuk menghitung persentase diskon (simulasi UI)
// -------------------------------------------------------------------
const calculateDiscount = function (price: number, original: number): number {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
};

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroArrowLeft,
      heroPencilSquare,
      heroShare,
      heroHeart,
      heroCheckBadge,
      heroTrash,
    }),
  ],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  productId = this.route.snapshot.paramMap.get('id');
  isLoading: boolean = true;

  // Siapkan data kosong dulu sebelum API datang (biar HTML nggak error)
  product: any = {
    name: 'Loading...',
    category: 'Loading...',
    subCategory: 'General',
    price: 0,
    originalPrice: 0,
    discount: 0,
    sku: '...',
    stock: 0,
    minStock: 10,
    supplier: 'Local Supplier',
    description: 'Memuat data dari server...',
    image: null,
    status: 'LOADING',
    variants: ['Standard'],
    lastUpdated: 'Today',
    createdBy: 'Admin',
  };

  // -------------------------------------------------------------------
  // 3. CLASS METHOD (Standar Angular)
  // -------------------------------------------------------------------
  ngOnInit() {
    if (this.productId) {
      this.loadProductFromApi(this.productId);
    }
  }

  loadProductFromApi(id: string) {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (response: any) => {
        const p = response.data;

        // MAPPING: Masukkan data asli ke variabel UI
        this.product.name = p.name;
        this.product.category = p.category ? p.category.name : 'Uncategorized';
        this.product.price = Number(p.price);
        this.product.stock = Number(p.stock);
        this.product.sku = p.sku || 'Belum ada SKU';
        this.product.description = p.description || 'Tidak ada deskripsi.';
        this.product.image =
          p.image_url ||
          'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80';

        this.product.status = generateStatusLabel(this.product.stock);
        this.product.originalPrice = this.product.price + this.product.price * 0.2;
        this.product.discount = calculateDiscount(this.product.price, this.product.originalPrice);

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Gagal narik detail produk:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // -------------------------------------------------------------------
  // 4. ARROW FUNCTION
  // -------------------------------------------------------------------
  deleteItem = () => {
    if (confirm('Yakin komandan mau hapus produk ini?')) {
      this.productService.deleteProductArrow(this.productId!).subscribe({
        next: () => {
          alert('Produk berhasil dihapus!');
          this.router.navigate(['/products']);
        },
        error: (err: any) => alert('Gagal menghapus produk.'),
      });
    }
  };
}
