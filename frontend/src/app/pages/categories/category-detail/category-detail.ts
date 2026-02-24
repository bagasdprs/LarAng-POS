import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { CategoryService } from '../../../services/category';

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
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  categoryId = this.route.snapshot.paramMap.get('id');

  // 1. TAMBAH SAKLAR LOADING BIAR NGGAK NGE-KEDIP GAMBAR KOPI
  isLoading: boolean = true;

  category: any = {
    id: '...',
    name: 'Loading...',
    description: 'Memuat data...',
    image: null, // Kosongkan biar spinner jalan
    status: true,
    revenue: 0,
    totalItems: 0,
  };

  products: any[] = [];

  ngOnInit() {
    if (this.categoryId) {
      this.loadCategoryDetail();
    }
  }

  loadCategoryDetail() {
    this.isLoading = true; // Nyalakan loading

    this.categoryService.getCategoryById(this.categoryId!).subscribe({
      next: (res: any) => {
        const c = res.data;
        this.category.id = c.id;
        this.category.name = c.name;
        this.category.description = c.description || 'Tidak ada deskripsi.';
        this.category.totalItems = c.products_count || (c.products ? c.products.length : 0);
        this.category.status = c.is_active === true || c.is_active === 1;

        // Tarik gambar asli dari database atau pakai initial kalau kosong
        this.category.image =
          c.image_url ||
          'https://ui-avatars.com/api/?name=' + c.name + '&background=EBD5AB&color=1B211A';

        // Hitung total harga barang dikali stok untuk simulasi "Aset / Revenue" (Lebih masuk akal)
        let totalAssetValue = 0;

        // 2. MAPPING DATA PRODUK SESUAI HTML BARU
        if (c.products && c.products.length > 0) {
          this.products = c.products.map((p: any) => {
            const priceNum = Number(p.price);
            const stockNum = Number(p.stock);

            totalAssetValue += priceNum * stockNum; // Tambah ke aset

            return {
              id: p.id,
              name: p.name,
              sku: p.sku || '-', // Panggil SKU
              price: priceNum,
              stock: stockNum, // Tetap biarkan ANGKA biar HTML bisa ngecek <= 10
              status: stockNum <= (p.min_stock || 10) ? 'Low Stock' : 'Active',
              image:
                p.image_url ||
                'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=150&q=80', // Panggil gambar produk
            };
          });
        } else {
          this.products = [];
        }

        this.category.revenue = totalAssetValue; // Tampilkan aset
        this.isLoading = false; // Matikan loading
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Gagal narik detail kategori', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleStatus() {
    this.category.status = !this.category.status;
    alert(
      `Status diubah menjadi: ${this.category.status ? 'Active' : 'Hidden'} (Masih simulasi UI)`,
    );
  }
}
