import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroPencilSquare,
  heroShare,
  heroHeart,
  heroCheckBadge,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  viewProviders: [
    provideIcons({ heroArrowLeft, heroPencilSquare, heroShare, heroHeart, heroCheckBadge }),
  ],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  productId = this.route.snapshot.paramMap.get('id');

  // Data Dummy (Miripin sama Desain 100%)
  product = {
    name: 'Caramel Macchiato',
    category: 'Beverages', // Category label atas
    subCategory: 'Hot Coffee', // Category label bawah
    price: 4.5,
    originalPrice: 5.0,
    discount: 10,
    sku: 'BEV-CM-001',
    stock: 150,
    minStock: 20,
    supplier: 'Bean & Brew Co.',
    description:
      'Our signature Caramel Macchiato is a coffee-forward delight. Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish. Made with 100% Arabica beans.',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    status: 'IN STOCK',
    variants: ['Small (8oz)', 'Medium (12oz)', 'Large (16oz)'],
    lastUpdated: 'Today, 10:23 AM',
    createdBy: 'Sarah Jenkins',
  };
}
