<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'items' => 'required|array', // Array belanjaan
            'items.*.id' => 'required|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
            'payment_method' => 'required|string'
        ]);

        // 2. Mulai Database Transaction (ACID)
        // Gunanya: Kalau ada 1 error di tengah jalan, semua perubahan dibatalkan (Rollback).
        // Ini WAJIB buat aplikasi keuangan.
        try {
            DB::beginTransaction();

            // Hitung Total Belanjaan di Backend (JANGAN percaya total dari Frontend)
            $totalAmount = 0;
            foreach ($request->items as $item) {
                $product = Product::find($item['id']);

                // Cek Stok
                if ($product->stock < $item['qty']) {
                    throw new \Exception("Stok {$product->name} tidak cukup!");
                }

                $totalAmount += $product->price * $item['qty'];
            }

            // A. Simpan Header Transaksi
            $transaction = Transaction::create([
                'user_id' => $request->user()->id, // Kasir yang login
                'invoice_code' => 'INV-' . time(), // Contoh: INV-17078899
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'status' => 'PAID'
            ]);

            // B. Simpan Detail Item & Potong Stok
            foreach ($request->items as $item) {
                $product = Product::find($item['id']);

                // 1. Simpan ke tabel transaction_items
                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $product->id,
                    'quantity' => $item['qty'],
                    'price_at_transaction' => $product->price // Snapshot harga
                ]);

                // 2. Potong Stok
                $product->decrement('stock', $item['qty']);
            }

            // Kalau semua lancar, COMMIT ke database
            DB::commit();

            return response()->json([
                'message' => 'Transaksi Berhasil!',
                'data' => $transaction->load('items')
            ]);
        } catch (\Exception $e) {
            // Kalau ada error, ROLLBACK (balikin semua stok & hapus data setengah jadi)
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
