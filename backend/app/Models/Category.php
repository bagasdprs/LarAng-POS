<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description', 'display_order', 'is_active', 'image_url'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
