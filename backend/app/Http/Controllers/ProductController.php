<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // Ambil produk + nama kategorinya
        // Filter: Hanya tampilkan produk aktif & stok > 0
        $products = Product::with('category')
            ->where('is_active', true)
            ->where('stock', '>', 0)
            ->get();

        return response()->json([
            'data' => $products
        ]);
    }

    // (Opsional) Buat nambah produk nanti
    public function store(Request $request)
    {
        // Validasi basic aja dulu
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($validated);

        return response()->json(['message' => 'Produk dibuat', 'data' => $product], 201);
    }
}
