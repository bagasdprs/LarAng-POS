import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// -------------------------------------------------------------------
// 1. FUNCTION DECLARATION
// Bikin URL dinamis. Kalau dikasih ID jadinya /products/1, kalau nggak jadi /products
// -------------------------------------------------------------------
function buildApiUrl(endpoint: string, id?: string | number): string {
  const base = `http://127.0.0.1:8000/api/${endpoint}`;
  return id ? `${base}/${id}` : base;
}

// -------------------------------------------------------------------
// 2. FUNCTION EXPRESSION
// Fungsi logger tanpa nama yang disimpan dalam variabel const
// -------------------------------------------------------------------
const logAction = function (method: string, message: string) {
  console.log(`📦 [ProductService - ${method}]: ${message}`);
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  // -------------------------------------------------------------------
  // 3. CLASS METHOD (Standar Emas Angular)
  // -------------------------------------------------------------------

  // A. Tarik Semua Produk (Buat halaman utama / List Produk)
  getProducts(): Observable<any> {
    logAction('GET', 'Menarik semua data produk...');
    return this.http.get<any>(buildApiUrl('products'));
  }

  // B. Tarik 1 Produk (Buat Product Detail & isi data awal di Form Edit)
  getProductById(id: string): Observable<any> {
    logAction('GET', `Mencari detail produk ID: ${id}`);
    return this.http.get<any>(buildApiUrl('products', id));
  }

  // C. Kirim Data Baru (Buat Product Form - Mode Add New)
  createProduct(data: any): Observable<any> {
    logAction('POST', 'Mengirim data produk baru ke dapur Laravel...');
    return this.http.post<any>(buildApiUrl('products'), data);
  }

  // D. Update Data Lama (Buat Product Form - Mode Edit)
  updateProduct(id: string, data: any): Observable<any> {
    logAction('PUT', `Mengupdate produk ID: ${id} (via POST trick untuk FormData)`);
    // 👈 INI FIX-NYA: Kita pakai buildApiUrl, bukan this.apiUrl
    return this.http.post<any>(buildApiUrl('products', id), data);
  }

  // -------------------------------------------------------------------
  // 4. ARROW FUNCTION
  // Fitur Hapus (Delete) biar API-nya komplit CRUD 100%!
  // -------------------------------------------------------------------
  deleteProductArrow = (id: string): Observable<any> => {
    logAction('DELETE', `Menghapus produk ID: ${id} dari muka bumi`);
    return this.http.delete<any>(buildApiUrl('products', id));
  };
}
