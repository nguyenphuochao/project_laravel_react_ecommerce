<?php

// admin
use App\Http\Controllers\API\Admin\AuthController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\Admin\OrderController;
use App\Http\Controllers\API\Admin\ProductController;
use App\Http\Controllers\API\Site\AccountController as SiteAccountController;
use App\Http\Controllers\API\Site\AddressController;
use App\Http\Controllers\API\Site\AuthController as SiteAuthController;
use App\Http\Controllers\API\Site\CategoryController as SiteCategoryController;
use App\Http\Controllers\API\Site\OrderController as SiteOrderController;
// site
use App\Http\Controllers\API\Site\ProductController as SiteProductController;
use Illuminate\Support\Facades\Hash;
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

// ------ Admin ------ //

// Render password
Route::get('render-pass', function () {
    echo Hash::make('123456');
});

// Login
Route::post('login', [AuthController::class, 'login']);

// Logout
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:staff');

// Xác thực nhóm API token
Route::middleware('auth:staff')->group(function () {
    // Orders
    Route::get('orders', [OrderController::class, 'getOrders']);

    // Auth
    Route::get('staff', [AuthController::class, 'getStaff']);

    // Categories
    Route::apiResource('categories', CategoryController::class);
    Route::post('categories/deleteAll', [CategoryController::class, 'deleteAll']);

    // Products
    Route::apiResource('products', ProductController::class);
    Route::get('getCategories', [ProductController::class, 'getCategories']);
    Route::get('getBrands', [ProductController::class, 'getBrands']);
});


// ------ Site ------ //

Route::get('site/products/featured', [SiteProductController::class, 'getFeaturedProducts']); // sản phẩm nổi bật
Route::get('site/products/latest', [SiteProductController::class, 'getLatestFeaturedProducts']); // sản phẩm mới nhất
Route::get('site/products/by_category', [SiteProductController::class, 'getProductsByCategory']); // sản phẩm theo danh mục
Route::get('site/products', [SiteProductController::class, 'getProducts']); // danh sách sản phẩm
Route::get('site/products/{id}', [SiteProductController::class, 'getProduct']); // chi tiết sản phẩm theo id

Route::get('site/categories', [SiteCategoryController::class, 'getCategories']); // danh sách categories

Route::post('site/login', [SiteAuthController::class, 'Login']); // đăng nhập
Route::post('site/logout', [SiteAuthController::class, 'Logout'])->middleware('auth:customer'); // đăng xuất
Route::get('site/customer', [SiteAuthController::class, 'getCustomer'])->middleware('auth:customer'); // thông tin customer

Route::put('site/customer/update_account_info', [SiteAccountController::class, 'updateAccountInfo'])->middleware('auth:customer'); // cập nhật thông tin tài khoản
Route::put('site/customer/update_shipping_address', [SiteAccountController::class, 'updateShippingAddress'])->middleware('auth:customer'); // cập nhật địa chỉ giao hàng mặc định

Route::get('site/provinces', [AddressController::class, 'getProvinces']); // danh sách tỉnh/thành phố
Route::get('site/districts', [AddressController::class, 'getDistrics']); // danh sách quận/huyện
Route::get('site/wards', [AddressController::class, 'getWards']); // danh sách phường/xã
Route::get('site/shipping_fee', [AddressController::class, 'getShippingFee']); // phí giao hàng

Route::post('site/order', [SiteOrderController::class, 'order']); // đặt hàng
Route::get('site/transport/{province_id}', [SiteOrderController::class, 'getTransport']); // phí giao hàng theo tỉnh/thành phố
Route::get('site/order_history', [SiteOrderController::class, 'getOrderHistory'])->middleware('auth:customer');; // lịch sử mua hàng
Route::get('site/order_history/{id}', [SiteOrderController::class, 'getOrderHistoryDetail'])->middleware('auth:customer'); // chi tiêt lịch sử mua hàng
