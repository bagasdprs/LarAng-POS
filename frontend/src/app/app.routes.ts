import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/products/product-detail/product-detail';
import { ProductForm } from './pages/products/product-form/product-form';
import { Categories } from './pages/categories/categories';
import { CategoryDetail } from './pages/categories/category-detail/category-detail';
import { CategoryForm } from './pages/categories/category-form/category-form';
import { Users } from './pages/users/users';
import { UserForm } from './pages/users/user-form/user-form';
import { UserDetail } from './pages/users/user-detail/user-detail';

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
      { path: 'products/new', component: ProductForm },
      { path: 'products/:id', component: ProductDetail },
      { path: 'products/:id/edit', component: ProductForm },

      // ========== ROUTING CATEGORIES ==========
      { path: 'categories', component: Categories },
      { path: 'categories/new', component: CategoryForm },
      { path: 'categories/:id', component: CategoryDetail },
      { path: 'categories/:id/edit', component: CategoryForm },

      // ========== ROUTING USERS MANAGEMENT ==========
      { path: 'users', component: Users },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm },
      { path: 'users/:id', component: UserDetail },
    ],
  },

  // Fallback kalau halaman ga ada
  { path: '**', redirectTo: 'login' },
];
