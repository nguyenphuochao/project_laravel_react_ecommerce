<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ViewProduct;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // Lấy danh sách nổi bật
    public function getFeaturedProducts()
    {
        $products = ViewProduct::where('featured', 1)->take(4)->get();
        return $this->getDataProducts($products);
    }

    // Lấy sản phẩm mới nhất
    public function getLatestFeaturedProducts()
    {
        $products = ViewProduct::orderBy('id', "DESC")->take(4)->get();
        return $this->getDataProducts($products);
    }

    // Lấy sản phẩm theo danh mục
    public function getProductsByCategory()
    {
        $categories = Category::all();
        $product_by_category = [];
        foreach ($categories as $category) {
            $products = ViewProduct::where('category_id', $category->id)->take(4)->get();
            $product_by_category[] = array(
                "cate_name" => $category->name,
                "products" => $this->getDataProducts($products)
            );
        }

        return $product_by_category;
    }

    // Lấy danh sách sản phẩm
    public function getProducts(Request $request)
    {
        $query = ViewProduct::query();

        // Sếp theo theo
        $sort_by = $request->input("sort-by");
        if ($sort_by) {
            if ($sort_by == "price-asc") {
                $query->orderBy("sale_price", "ASC");
            } else if ($sort_by == "price-desc") {
                $query->orderBy("sale_price", "DESC");
            } else if ($sort_by == "alpha-asc") {
                $query->orderBy("name", "ASC");
            } else if ($sort_by == "alpha-desc") {
                $query->orderBy("name", "DESC");
            } else if ($sort_by == "created-asc") {
                $query->orderBy("created_date", "ASC");
            } else if ($sort_by == "created-desc") {
                $query->orderBy("created_date", "DESC");
            }
        }

        // Hiển thị theo danh mục sản phẩm
        $category_id = $request->input("category-id");
        if ($category_id) {
            if ($category_id == "all") {
                $query->where("category_id", ">", 0);
            } else {
                $query->where("category_id", $category_id);
            }
        }

        // Hiển thị theo khoảng giá
        $price_range = $request->input("price-range");
        if ($price_range) {
            if ($price_range == "0-100000") {
                $query->whereBetween("sale_price", [0, 100000]);
            } else if ($price_range == "100000-200000") {
                $query->whereBetween("sale_price", [100000, 200000]);
            } else if ($price_range == "200000-300000") {
                $query->whereBetween("sale_price", [200000, 300000]);
            } else if ($price_range == "300000-500000") {
                $query->whereBetween("sale_price", [300000, 500000]);
            } else if ($price_range == "500000-1000000") {
                $query->whereBetween("sale_price", [500000, 1000000]);
            } else if ($price_range == "1000000-greater") {
                $query->where("sale_price", ">=", 1000000);
            }
        }

        // search theo tên sản phẩm
        $search = $request->input("search");
        if ($search) {
            $query->where("name", "like", '%' . $search . '%');
        }

        $perPage = 12;
        $page = $request->input('page', 1);
        $totalItem = $query->count();
        $totalPage = ceil($totalItem / $perPage);

        $result = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

        return response()->json([
            "items" => $this->getDataProducts($result),
            "totalItem" => $totalItem,
            "pagination" => [
                "page" => (int)$page,
                "totalPage" => $totalPage
            ]
        ]);
    }

    // Lấy chi tiết sản phẩm theo id
    public function getProduct($id)
    {
        $product = ViewProduct::find($id);

        if (!$product) {
            return response()->json([
                "message" => "Không tồn tại sản phẩm id=" . $id
            ], Response::HTTP_NOT_FOUND);
        }

        $baseUrl = request()->getSchemeAndHttpHost();

        // Nhiều hình ảnh
        $images = [];
        foreach ($product->image_items as $image_item) {
            $images[] = array(
                "name" => $baseUrl . "/uploads/" . $image_item->name
            );
        }

        // Sản phẩm liên quan
        $relatedProducts = [];
        $products = ViewProduct::where("category_id", "=", $product->category_id)->get();
        foreach ($products as $related_item) {
            if ($related_item->id != $id) {
                $relatedProducts[] = array(
                    "product_id" => $related_item->id,
                    "product_name" => $related_item->name,
                    "price" => $related_item->price,
                    "sale_price" => $related_item->sale_price,
                    "featured_image" => $baseUrl . "/uploads/" . $related_item->featured_image
                );
            }
        }

        // data
        $product = array(
            "product_id" => $product->id,
            "barcode" => $product->barcode,
            "product_name" => $product->name,
            "price" => $product->price,
            "sale_price" => (int)$product->sale_price,
            "featured_image" => $baseUrl . "/uploads/" . $product->featured_image,
            "image_items" => $images,
            "inventory_qty" => $product->inventory_qty,
            "category_name" => $product->category->name,
            "brand_name" => $product->brand->name,
            "description" => $product->description,
            "relatedProducts" => $relatedProducts
        );

        return $product;
    }

    // Lấy Data Product
    private function getDataProducts($products)
    {
        $baseUrl = request()->getSchemeAndHttpHost(); // lấy domain hiện tại
        $data = [];
        foreach ($products as $product) {
            $data[] = array(
                "product_id" => $product->id,
                "barcode" => $product->barcode,
                "product_name" => $product->name,
                "price" => $product->price,
                "sale_price" => (int)$product->sale_price,
                "featured_image" => $baseUrl . "/uploads/" . $product->featured_image,
                "inventory_qty" => $product->inventory_qty,
                "category_name" => $product->category->name,
                "brand_name" => $product->brand->name,
                "description" => $product->description
            );
        }

        return $data;
    }
}
