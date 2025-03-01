<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = "order_item";
    public $timestamps = false;

    function order()
    {
        return $this->belongsTo(Order::class, "order_id");
    }

    function product()
    {
        return $this->belongsTo(ViewProduct::class, "product_id");
    }
}
