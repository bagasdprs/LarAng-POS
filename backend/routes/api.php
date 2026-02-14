<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 1. Public Routes (Bisa diakses tanpa login)
Route::post('/login', [AuthController::class, 'login']);

// 2. Protected Routes (Harus ada Token / Login dulu)
Route::middleware('auth:sanctum')->group(function () {

    // User Info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // POS Features
    Route::get('/products', [ProductController::class, 'index']); // List Produk
    Route::post('/products', [ProductController::class, 'store']); // Tambah Produk (Buat Admin)

    Route::post('/transactions', [TransactionController::class, 'store']); // Checkout
});
