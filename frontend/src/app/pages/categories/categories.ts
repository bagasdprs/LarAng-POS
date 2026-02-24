import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { CategoryService } from '../../services/category'; // 👈 Panggil kurir
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIconComponent],
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
export class Categories implements OnInit {
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  activeMenuId: string | null = null;
  categories: any[] = [];
  isLoading: boolean = true;
  searchQuery: string = '';

  insights = [
    {
      label: 'Largest Category',
      value: 'Loading...',
      icon: 'heroSparkles',
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Total Categories',
      value: 'Loading...',
      icon: 'heroCube',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      label: 'Total Products',
      value: 'Loading...',
      icon: 'heroMagnifyingGlass',
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  get filteredCategories() {
    if (!this.searchQuery.trim()) {
      return this.categories;
    }

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    return this.categories.filter((cat) => cat.name.toLowerCase().includes(lowerCaseQuery));
  }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.isLoading = true;

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data.map((cat: any) => {
          const itemCount = cat.products_count || 0;

          let badgeText = 'STOCKED';
          let badgeClass = 'bg-white/60 text-green-700';
          let dotClass = 'bg-green-600';

          if (itemCount === 0) {
            badgeText = 'EMPTY';
            badgeClass = 'bg-white/60 text-gray-500';
            dotClass = 'bg-gray-400';
          }

          return {
            id: cat.id.toString(),
            name: cat.name,
            count: itemCount,
            image:
              cat.image_url ||
              'https://ui-avatars.com/api/?name=' + cat.name + '&background=EBD5AB&color=1B211A',
            badgeText: badgeText,
            badgeClass: badgeClass,
            dotClass: dotClass,
          };
        });

        const totalCat = this.categories.length;
        if (totalCat === 0) {
          this.insights[0].value = '-';
          this.insights[1].value = '0 Categories';
          this.insights[2].value = '0 Items';
        } else {
          const largest = this.categories.reduce((prev, current) =>
            prev.count > current.count ? prev : current,
          );
          this.insights[0].value = largest.name;
          this.insights[1].value = `${totalCat} Categories`;

          const totalProd = this.categories.reduce((sum, cat) => sum + cat.count, 0);
          this.insights[2].value = `${totalProd} Items`;
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Gagal memuat kategori:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

  closeMenu() {
    this.activeMenuId = null;
  }

  deleteCategory(id: string, name: string) {
    Swal.fire({
      title: 'Hapus Kategori?',
      text: `Kamu yakin ingin menghapus kategori "${name}"? Data yang dihapus tidak bisa dikembalikan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
            this.fetchCategories();
          },
          error: (err: any) => {
            Swal.fire('Gagal!', err.error?.message || 'Tidak bisa menghapus kategori.', 'error');
          },
        });
      }
    });
  }
}
