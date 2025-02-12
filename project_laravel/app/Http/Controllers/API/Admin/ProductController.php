<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // query join product vs category
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

        // search product barcode
        $search_product_barcode = $request->input('search_product_barcode');
        if ($search_product_barcode) {
            $query->where('product.barcode', '=', $search_product_barcode);
        }

        // search product name
        $search_product_name = $request->input('search_product_name');
        if ($search_product_name) {
            $query->where('product.name', 'like', '%' . $search_product_name . '%');
        }

        // search category name
        $search_category_name = $request->input('search_category_name');
        if ($search_category_name) {
            $query->where("category.name", "like", '%' . $search_category_name . '%');
        }

        $search_product_created_date_from = $request->input('search_product_created_date_from');
        $search_product_created_date_to = $request->input('search_product_created_date_to');

        // search product created date from
        if ($search_product_created_date_from) {
            $search_product_created_date_from = date("Y-m-d", strtotime($search_product_created_date_from));
            $query->where('created_date', '>=', $search_product_created_date_from);
        }
        // seach product created date to
        if ($search_product_created_date_to) {
            $search_product_created_date_to = date("Y-m-d", strtotime($search_product_created_date_to . '+1 day'));
            $query->where('created_date', '<=', $search_product_created_date_to);
        }

        $perPage = $request->input("per_page", 5);
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
        // validate
        $request->validate(
            [
                'barcode'           => 'required|digits:13|numeric|unique:product,barcode',
                'sku'               => 'required',
                'name'              => 'required|unique:product,name',
                'price'             => 'required',
                'inventory_qty'     => 'required',
                'category_id'       => 'required',
                'brand_id'          => 'required',
                'featured_image'    => 'mimes:jpeg,jpg,png,gif|nullable',
                'description'       => 'required'
            ],
            [
                'barcode.required'          => 'Vui lòng nhập barcode',
                'barcode.unique'            => 'Barcode đã tồn tại',
                'barcode.digits'            => 'Barcode phải 13 chữ số',
                'barcode.numeric'           => 'Barcode phải 13 chữ số',
                'sku.required'              => 'Vui lòng nhập SKU',
                'name.required'             => 'Vui lòng nhập tên sản phẩm',
                'name.unique'               => 'Tên sản phẩm bị trùng',
                'inventory_qty.required'    => 'Vui lòng nhập số lượng sản phẩm',
                'category_id.required'      => 'Vui lòng chọn danh mục',
                'brand_id'                  => 'Vui lòng chọn nhãn hiệu',
                'featured_image.mimes'      => 'Vui lòng chọn định dạng jpeg,jpg,png,gif',
                'description'               => 'Vui lòng nhập mô tả sản phẩm'
            ]
        );

        $product = new Product();
        $product->barcode = $request->barcode;
        $product->sku = $request->sku;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->sale_price = $request->price;
        $product->inventory_qty = $request->inventory_qty;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->featured = $request->featured;
        $product->description = $request->description;
        $product->discount_from_date = date('Y-m-d');
        $product->discount_to_date = date('Y-m-d');
        $product->discount_percentage = 0;
        $product->created_date = date('Y-m-d H:i:s');
        if ($request->hasFile('featured_image')) {
            $baseUrl = request()->getSchemeAndHttpHost();
            $file = $request->file('featured_image');
            $path = public_path() . '/uploads';
            $file_name = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $file_name);
            $product->featured_image = $baseUrl . '/uploads/' . $file_name;
        }

        $product->save();

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                "message" => "Không tìm thấy sản phẩm id=" . $id
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // validate
        $request->validate(
            [
                'barcode'           => 'required|digits:13|numeric|unique:product,barcode,' . $id,
                'sku'               => 'required',
                'name'              => 'required|unique:product,name,' . $id,
                'price'             => 'required',
                'inventory_qty'     => 'required',
                'category_id'       => 'required',
                'brand_id'          => 'required',
                'featured_image'    => 'mimes:jpeg,jpg,png,gif|nullable',
                'description'       => 'required'
            ],
            [
                'barcode.required'          => 'Vui lòng nhập barcode',
                'barcode.unique'            => 'Barcode đã tồn tại',
                'barcode.digits'            => 'Barcode phải 13 chữ số',
                'barcode.numeric'           => 'Barcode phải 13 chữ số',
                'sku.required'              => 'Vui lòng nhập SKU',
                'name.required'             => 'Vui lòng nhập tên sản phẩm',
                'name.unique'               => 'Tên sản phẩm bị trùng',
                'inventory_qty.required'    => 'Vui lòng nhập số lượng sản phẩm',
                'category_id.required'      => 'Vui lòng chọn danh mục',
                'brand_id'                  => 'Vui lòng chọn nhãn hiệu',
                'featured_image.mimes'      => 'Vui lòng chọn định dạng jpeg,jpg,png,gif',
                'description'               => 'Vui lòng nhập mô tả sản phẩm'
            ]
        );

        $product = Product::find($id);
        $product->barcode = $request->barcode;
        $product->sku = $request->sku;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->inventory_qty = $request->inventory_qty;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->featured = $request->featured;
        $product->description = $request->description;
        $product->discount_from_date = date('Y-m-d');
        $product->discount_to_date = date('Y-m-d');
        $product->discount_percentage = 0;
        $product->created_date = date('Y-m-d H:i:s');
        if ($request->hasFile('featured_image')) {
            $baseUrl = request()->getSchemeAndHttpHost();
            $file = $request->file('featured_image');
            $path = public_path() . '/uploads';
            $file_name = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $file_name);
            $product->featured_image = $baseUrl . '/uploads/' . $file_name;
        }

        $product->save();

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                "message" => "Không tìm thấy sản phẩm id=" . $id
            ],  Response::HTTP_NOT_FOUND);
        }

        Product::destroy($id);
        return response()->json([
            "message" => "Đã xóa sản phẩm thành công"
        ],  Response::HTTP_OK);
    }

    public function getCategories()
    {
        return Category::all();
    }

    public function getBrands()
    {
        return Brand::all();
    }
}
