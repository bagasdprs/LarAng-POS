<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    protected $fillable = [
        'transaction_id',
        'product_id',
        'quantity',
        'price_at_transaction'
    ];

    // Relasi: Item milik SATU Transaksi
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    // Relasi: Item adalah SATU Produk
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
