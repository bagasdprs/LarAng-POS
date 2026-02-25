<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 1. Public Routes (Bisa diakses tanpa login)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/dashboard/stats', [DashboardController::class, 'getStats']); // Dashboard Stats
Route::get('/products', [ProductController::class, 'index']); // List Produk
Route::post('/products', [ProductController::class, 'store']); // Tambah Produk (Buat Admin)
Route::get('/products/{id}', [ProductController::class, 'show']); // Detail Produk
Route::put('/products/{id}', [ProductController::class, 'update']); // Update Produk
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// 2. Protected Routes (Harus ada Token / Login dulu)
Route::middleware('auth:sanctum')->group(function () {

    // User Info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', [\App\Http\Controllers\Api\UserController::class, 'index']);
    Route::put('/users/{id}/approve', [\App\Http\Controllers\Api\UserController::class, 'approveAsKasir']);
    Route::post('/users', [\App\Http\Controllers\Api\UserController::class, 'store']); // Untuk Create
    Route::put('/users/{id}', [\App\Http\Controllers\Api\UserController::class, 'update']); // Untuk Edit

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // POS Features
    Route::post('/transactions', [TransactionController::class, 'store']); // Checkout


});
