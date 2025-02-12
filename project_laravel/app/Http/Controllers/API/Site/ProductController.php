<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // Lấy danh sách sản phẩm
    public function getProducts(Request $request)
    {
        // sleep(10);
        // Sản phẩm nổi bật
        $featured = $request->input('featured');
        if ($featured) {
            $products = Product::where('featured', 1)->take(4)->get();
            return $this->getDataProduct($products);
        }

        // Sản phẩm mới nhất
        $latest = $request->input('latest');
        if ($latest) {
            $products = Product::orderBy('id', "DESC")->take(4)->get();
            return $this->getDataProduct($products);
        }

        // Sản phẩm theo danh mục
        $by_category = $request->input('by_category');
        $categories = Category::all();
        $product_by_category = [];
        if ($by_category) {
            foreach ($categories as $category) {
                $products = Product::where('category_id', $category->id)->take(4)->get();
                $product_by_category[] = array(
                    "cate_name" => $category->name,
                    "products" => $this->getDataProduct($products)
                );
            }

            return $product_by_category;
        }

        // Lấy tất cả sản phẩm
        $all = $request->input('all');
        if ($all) {
            $query = Product::query();

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
                $query->where("category_id", $category_id);
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

            $perPage = 12;
            $page = $request->input('page', 1);
            $totalItem = $query->count();
            $totalPage = ceil($totalItem / $perPage);

            $result = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

            return response()->json([
                "items" => $this->getDataProduct($result),
                "totalItem" => $totalItem,
                "pagination" => [
                    "page" => (int)$page,
                    "totalPage" => $totalPage
                ]
            ]);
        }
    }

    // Lấy chi tiết sản phẩm theo id
    public function getProduct($id)
    {
        $products = Product::where('id', $id)->get();

        if (count($products) == 0) {
            return response()->json([
                "message" => "Không tồn tại sản phẩm id=" . $id
            ], Response::HTTP_NOT_FOUND);
        }

        return current($this->getDataProduct($products));
    }

    // Lấy Data Product
    private function getDataProduct($products)
    {
        $date = date('Y-m-d');
        $data = [];
        foreach ($products as $product) {
            $discount = $product->price * (1 - $product->discount_percentage / 100);
            $data[] = array(
                "product_id" => $product->id,
                "barcode" => $product->barcode,
                "product_name" => $product->name,
                "price" => $product->price,
                "sale_price" => $product->discount_from_date <= $date && $product->discount_to_date >= $date ? $discount : $product->price,
                "featured_image" => $product->featured_image,
                "inventory_qty" => $product->inventory_qty,
                "category_name" => $product->category->name,
                "brand_name" => $product->brand->name,
                "description" => $product->description
            );
        }

        return $data;
    }
}
