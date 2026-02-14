<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'invoice_code',
        'total_amount',
        'payment_method',
        'status', // 'PENDING', 'PAID', 'CANCELLED'
    ];

    // Relasi: Transaksi dibuat oleh SATU User (Kasir)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi: Satu Transaksi punya BANYAK Item belanjaan
    // Perhatikan nama methodnya 'items', bukan 'transactionItems' biar codingnya enak: $trx->items
    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
