<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $table = "order";
    public $timestamps = false;

    function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    function status()
    {
        return $this->belongsTo(Status::class, 'order_status_id');
    }

    function staff(){
        return $this->belongsTo(Staff::class);
    }

    function ward()
    {
        return $this->belongsTo(Ward::class, "shipping_ward_id");
    }
}
