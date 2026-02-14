import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/products/product-detail/product-detail';
import { ProductForm } from './pages/products/product-form/product-form';
import { Categories } from './pages/categories/categories';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },

      // ========== ROUTING PRODUCTS ==========
      { path: 'products', component: Products },
      { path: 'products/add', component: ProductForm },
      { path: 'products/:id', component: ProductDetail },
      { path: 'products/:id/edit', component: ProductForm },

      // ========== ROUTING CATEGORIES ==========
      { path: 'categories', component: Categories },
    ],
  },

  // Fallback kalau halaman ga ada
  { path: '**', redirectTo: 'login' },
];
