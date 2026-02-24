<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getStats()
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->month;
        $thisYear = Carbon::now()->year;

        // 1. Total Pendapatan Hari Ini
        $revenueToday = DB::table('transactions')
            ->whereDate('created_at', $today)
            // ->where('status', 'success') // Hilangkan comment ini kalau kamu pakai filter status di tabel transactions
            ->sum('total_amount');

        // 2. Total Transaksi Hari Ini
        $transactionsToday = DB::table('transactions')
            ->whereDate('created_at', $today)
            ->count();

        // 3. Pendapatan Bulan Ini
        $revenueThisMonth = DB::table('transactions')
            ->whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->sum('total_amount');

        // 4. Top 5 Produk Terlaris
        $topProducts = DB::table('transaction_items')
            ->join('products', 'transaction_items.product_id', '=', 'products.id')
            ->select('products.name', DB::raw('SUM(transaction_items.quantity) as total_sold'))
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        // Format response menjadi JSON
        return response()->json([
            'status' => 'success',
            'message' => 'Dashboard stats retrieved successfully',
            'data' => [
                'revenue_today' => (float) $revenueToday,
                'transactions_today' => $transactionsToday,
                'revenue_this_month' => (float) $revenueThisMonth,
                'top_products' => $topProducts
            ]
        ], 200);
    }
}
