import { Component, inject, OnInit } from '@angular/core'; // ✅ FIX: Tambah OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// ✅ FIX: Tambah heroCheck untuk tombol save, dan heroEye untuk kotak info biru
import {
  heroArrowLeft,
  heroCloudArrowUp,
  heroTrash,
  heroCheck,
  heroEye,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeft, heroCloudArrowUp, heroTrash, heroCheck, heroEye })], // ✅ FIX: Daftarin icon baru
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  // ✅ FIX: Implement OnInit
  private route = inject(ActivatedRoute);
  productId = this.route.snapshot.paramMap.get('id');

  // Kalau URL-nya /products/new, productId ini bakal null.
  // Tapi karena di routing 'new' kita taruh di atas ':id',
  // kita cukup cek productId-nya aja.
  isEditMode = !!this.productId;

  // ✅ FIX: Bikin state awal KOSONG melompong untuk Add New Product
  product: any = {
    name: '',
    category: '',
    sku: '',
    description: '',
    price: null,
    costPrice: null,
    stock: null,
    minStock: null,
    status: true, // Default checked (Sesuai gambar referensi)
    taxable: true,
    image: null,
  };

  categories = ['Beverages', 'Food', 'Snacks', 'Dessert'];

  // ✅ FIX: Pengecekan data ditaruh di ngOnInit
  ngOnInit() {
    if (this.isEditMode) {
      // Pura-puranya kita nge-fetch data dari API Laravel berdasarkan ID
      this.loadDummyDataForEdit();
    }
  }

  // ✅ FIX: Fungsi khusus buat ngisi data DUMMY (Cuma jalan pas Edit Mode)
  loadDummyDataForEdit() {
    this.product = {
      name: 'Caramel Macchiato',
      category: 'Beverages',
      sku: 'BEV-CM-001',
      description:
        'Rich espresso with vanilla-flavored syrup, milk and ice, topped with a caramel drizzle for an oh-so-sweet finish.',
      price: 4.5,
      costPrice: 1.25,
      stock: 150,
      minStock: 10,
      status: true,
      taxable: true,
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    };
  }

  // ✅ FIX: Tambah fungsi hapus gambar biar tombol "Remove" di HTML bisa jalan
  removeImage() {
    this.product.image = null;
  }

  saveProduct() {
    // ✅ FIX: Alert disesuaikan dengan mode
    const actionText = this.isEditMode ? 'diupdate' : 'ditambahkan';
    alert(`Simulasi: Produk berhasil ${actionText}! (Data dikirim ke Laravel)`);
  }
}
