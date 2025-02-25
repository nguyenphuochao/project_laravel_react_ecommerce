<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewProduct extends Model
{
    use HasFactory;

    protected $table = "view_product";

    function category()
    {
        return $this->belongsTo(Category::class, "category_id");
    }

    function brand()
    {
        return $this->belongsTo(Brand::class, "brand_id");
    }

    function image_items()
    {
        return $this->hasMany(ImageItem::class, "product_id");
    }
}
