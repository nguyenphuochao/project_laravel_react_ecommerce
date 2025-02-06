<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Staff extends Authenticatable
{
    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'staff';

    protected $fillable = ['name', 'email', 'password',];

    protected $hidden = ['password'];
}
