<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'sku',
        'price',
        'stock',
        'image_url',
        'is_active'
    ];

    // Relasi: Produk milik SATU Kategori
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
