<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;


class CategoryController extends Controller
{
    public function getCategories()
    {
        return Category::all();
    }
}
