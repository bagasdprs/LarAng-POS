<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->where('stock', '>', 0)
            ->get();

        return response()->json([
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'nullable|string|unique:products',
            'price' => 'required|numeric',
            'cost_price' => 'nullable|numeric',
            'stock' => 'required|integer',
            'min_stock' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'is_taxable' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);


        if (empty($validated['sku'])) {
            $validated['sku'] = 'SKU-' . date('Ymd') . '-' . strtoupper(Str::random(4));
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = url('storage/' . $path);
        }

        $product = Product::create($validated);
        return response()->json(['message' => 'Produk dibuat', 'data' => $product], 201);
    }

    public function show($id)
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        return response()->json(['data' => $product]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'category_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'nullable|string|unique:products',
            'price' => 'required|numeric',
            'cost_price' => 'nullable|numeric',
            'stock' => 'required|integer',
            'min_stock' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'is_taxable' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image_url) {
                $oldPath = str_replace(url('storage') . '/', '', $product->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = url('storage/' . $path);
        }

        $product->update($validated);
        return response()->json(['message' => 'Produk berhasil diupdate', 'data' => $product]);
    }
}
