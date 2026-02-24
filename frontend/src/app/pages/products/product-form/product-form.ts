import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroCloudArrowUp,
  heroTrash,
  heroCheck,
  heroEye,
} from '@ng-icons/heroicons/outline';
import { ProductService } from '../../../services/product';
import { CategoryService } from '../../../services/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeft, heroCloudArrowUp, heroTrash, heroCheck, heroEye })],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  isSubmitting = false;

  productId = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.productId;

  selectedFile: File | null = null;

  // 1. Inisialisasi Produk
  product: any = {
    name: '',
    category: '',
    sku: '',
    description: '',
    price: null,
    costPrice: null,
    stock: null,
    minStock: 10,
    status: true,
    taxable: true,
    image: null,
  };

  categoryMap: any = {};
  categories: any[] = [];

  ngOnInit() {
    this.fetchCategories();

    if (this.isEditMode) {
      this.loadDataFromLaravel();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Simpan file aslinya

      // Bikin mesin pembaca gambar buat Preview UI
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.image = e.target.result; // Ubah jadi Base64 biar bisa ditampilin HTML
        this.cdr.detectChanges(); // Tendang UI biar langsung update!
      };
      reader.readAsDataURL(file);
    }
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        const cats = res.data;
        // Bangun ulang kamus datanya secara dinamis
        cats.forEach((c: any) => {
          this.categories.push(c.name); // Masuk ke dropdown HTML
          this.categoryMap[c.name] = c.id; // Disimpan buat dikirim ke Laravel
        });
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Gagal narik kategori:', err),
    });
  }

  loadDataFromLaravel() {
    this.productService.getProductById(this.productId!).subscribe({
      next: (res: any) => {
        const p = res.data;
        this.product.name = p.name;
        this.product.price = Number(p.price);
        this.product.stock = Number(p.stock);

        // Terjemahkan balik dari ID Laravel ke Nama HTML
        this.product.category = p.category ? p.category.name : '';
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Gagal memuat data edit:', err),
    });
  }

  removeImage() {
    this.product.image = null;
    this.selectedFile = null;
  }

  saveProduct() {
    this.isSubmitting = true; // Nyalakan loading spinner

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description || '');
    formData.append('price', this.product.price?.toString() || '0');
    formData.append('stock', this.product.stock?.toString() || '0');
    formData.append('min_stock', this.product.minStock?.toString() || '10');
    formData.append('is_active', this.product.status ? '1' : '0');
    formData.append('is_taxable', this.product.taxable ? '1' : '0');

    const catId = this.categoryMap[this.product.category] || 1;
    formData.append('category_id', catId.toString());

    if (this.product.sku) formData.append('sku', this.product.sku);
    if (this.product.costPrice) formData.append('cost_price', this.product.costPrice.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode) {
      formData.append('_method', 'PUT');

      this.productService.updateProduct(this.productId!, formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire('Berhasil!', 'Produk dan foto sukses di-update.', 'success').then(() => {
            this.router.navigate(['/products']);
          });
        },
        error: (err: any) => {
          this.isSubmitting = false;
          console.error(err);
          Swal.fire('Oops...', 'Gagal update produk. Cek Console!', 'error');
        },
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire('Berhasil!', 'Produk baru sukses ditambahkan.', 'success').then(() => {
            this.router.navigate(['/products']);
          });
        },
        error: (err: any) => {
          this.isSubmitting = false;
          console.error(err);
          Swal.fire('Oops...', 'Gagal nambah produk. Pastikan form wajib udah diisi!', 'error');
        },
      });
    }
  }
}
