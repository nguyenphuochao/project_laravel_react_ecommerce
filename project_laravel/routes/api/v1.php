<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Login
Route::post('login', [AuthController::class, 'login']);
// Logout
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Xác thực nhóm API token
Route::middleware('auth:sanctum')->group(function () {
    // get Staff
    Route::get('staff', [AuthController::class, 'getStaff']);

    // Categories
    Route::apiResource('categories', CategoryController::class);
    Route::post('categories/deleteAll', [CategoryController::class, 'deleteAll']);

    // Products
    Route::apiResource('products', ProductController::class);
    Route::get('products/getCategories', [ProductController::class, 'getCategories']);
    Route::get('products/getBrands', [ProductController::class, 'getBrands']);
});
