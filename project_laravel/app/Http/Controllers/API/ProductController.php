<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query()->join("category", "category.id", "=", "product.category_id")
            ->select(
                [
                    "product.id as product_id",
                    "product.barcode",
                    "product.name as product_name",
                    "product.featured_image as image",
                    "product.discount_percentage",
                    "product.price",
                    DB::raw("product.price - (product.price * product.discount_percentage / 100) as sale_price"),
                    "product.inventory_qty",
                    "product.star",
                    "product.featured",
                    "category.name as category_name",
                    "product.created_date"
                ]
            )->orderBy('product.id', "DESC");

        $search_product_barcode = $request->input('search_product_barcode');
        if ($search_product_barcode) {
            $query->where('product.barcode', '=', $search_product_barcode);
        }

        $search_product_name = $request->input('search_product_name');
        if ($search_product_name) {
            $query->where('product.name', 'like', '%' . $search_product_name . '%');
        }

        $search_category_name = $request->input('search_category_name');
        if ($search_category_name) {
            $query->where("category.name", "like", '%' . $search_category_name . '%');
        }

        $search_product_created_date = $request->input('search_product_created_date');
        if ($search_product_created_date) {
            $query->where('created_date', '>=', $search_product_created_date);
        }

        $perPage = $request->input("perPage", 5);
        $page = $request->input('page', 1);
        $totalItem = $query->count();
        $totalPage = ceil($totalItem / $perPage);

        $result = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

        return response()->json([
            "items" => $result,
            "perPage" => (int)$perPage,
            "totalItem" => $totalItem,
            "pagination" => [
                "page" => (int)$page,
                "totalPage" => $totalPage
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
