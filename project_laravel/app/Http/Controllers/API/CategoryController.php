<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query()->orderBy('id', "DESC");

        $search = $request->input('search');
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
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
        // validate
        $request->validate(
            [
                'name' => 'required|unique:category,name'
            ],
            [
                'name.required' => 'Vui long nhập tên danh mục',
                'name.unique' => 'Tên danh mục đã tồn tại'
            ]
        );

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // validate
        $request->validate(
            [
                'name' => 'required'
            ],
            [
                'name.required' => 'Vui long nhập tên danh mục'
            ]
        );

        $category = Category::query()->findOrFail($id);
        $category->update($request->all());

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = Category::find($id);
            $category->delete();
            return response()->json($category, 204);
        } catch (\Throwable  $th) {
            if ($th->getCode() == 23000) {
                return response()->json([
                    "message" => "Danh mục chứa sản phẩm, không thể xóa",
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return response()->json([
                "message" => "Không tìm thấy danh mục có id=" . $id,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteAll(Request $request)
    {
        try {
            $ids = $request->input('ids');
            foreach ($ids as $id) {
                $category = Category::find($id);
                $category->delete();
            }
        } catch (\Throwable $th) {
            if ($th->getCode() == 23000) {
                return response()->json([
                    "message" => "Danh mục chứa sản phẩm, không thể xóa",
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            return response()->json([
                "message" => "Không tìm thấy danh mục",
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
