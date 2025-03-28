<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "customer";
    public $timestamps = false;
    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password'];

    function ward()
    {
        return $this->belongsTo(Ward::class, "ward_id");
    }
}
