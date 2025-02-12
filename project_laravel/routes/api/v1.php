<?php

// admin
use App\Http\Controllers\API\Admin\AuthController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\Admin\OrderController;
use App\Http\Controllers\API\Admin\ProductController;

// site
use App\Http\Controllers\API\Site\ProductController as SiteProductController;
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

// ------ Admin ------

// Login
Route::post('login', [AuthController::class, 'login']);
// Logout
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Xác thực nhóm API token
Route::middleware('auth:sanctum')->group(function () {
    // Dashboard
    Route::get('orders', [OrderController::class, 'getOrders']);
    Route::get('orders/getStatistical', [OrderController::class, 'getStatistical']);

    // get Staff
    Route::get('staff', [AuthController::class, 'getStaff']);

    // Categories
    Route::apiResource('categories', CategoryController::class);
    Route::post('categories/deleteAll', [CategoryController::class, 'deleteAll']);

    // Products
    Route::apiResource('products', ProductController::class);
    Route::get('getCategories', [ProductController::class, 'getCategories']);
    Route::get('getBrands', [ProductController::class, 'getBrands']);
});


// ------ Site ------
Route::get('site/products', [SiteProductController::class, 'getProducts']);
Route::get('site/products/{id}', [SiteProductController::class, 'getProduct']);
