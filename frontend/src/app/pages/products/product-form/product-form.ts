import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Wajib buat Form
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroCloudArrowUp, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeft, heroCloudArrowUp, heroTrash })],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private route = inject(ActivatedRoute);
  productId = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.productId; // Cek apakah ini mode Edit atau Add

  // Data Produk (Kalau Edit, ini pura-puranya data dari API)
  product = {
    name: 'Caramel Macchiato',
    category: 'Beverages',
    sku: 'BEV-CM-001',
    description:
      'Rich espresso with vanilla-flavored syrup, milk and ice, topped with a caramel drizzle for an oh-so-sweet finish.',
    price: 4.5,
    costPrice: 1.25,
    stock: 150,
    minStock: 10,
    status: true, // true = Available
    taxable: true, // true = Taxable
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
  };

  categories = ['Beverages', 'Food', 'Snacks', 'Dessert'];

  saveProduct() {
    alert('Simulasi: Produk berhasil disimpan! (Data dikirim ke Laravel)');
    // Nanti di sini kita panggil Service API
  }
}
