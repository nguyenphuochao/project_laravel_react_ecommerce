<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;

    protected $table = "ward";

    function district()
    {
        return $this->belongsTo(District::class, "district_id");
    }
}
