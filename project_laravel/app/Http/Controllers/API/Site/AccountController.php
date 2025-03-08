<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    // cập nhật thông tin tài khoản
    public function updateAccountInfo(Request $request)
    {
        $customer = $request->user();
        $customerID = $customer->id;

        // validate
        $request->validate(
            [
                "fullname" => "required",
                "mobile" => "required",
                "current_password" => "nullable",
                "new_password" => "nullable",
                "confirm_password" => "same:new_password"
            ],
            [
                "fullname.required" => "Vui lòng nhập họ và tên",
                "mobile.required" => "Vui lòng nhập điện thoại",
                "confirm_password.same" => "Xác nhận password chưa khớp"
            ]
        );

        $customer = Customer::find($customerID);

        $current_password = $request->current_password;
        $db_password = $customer->password;

        // kiểm tra password hiện tại có hợp lệ không
        if ($request->current_password) {
            if (!Hash::check($current_password, $db_password)) {
                $errors = [
                    "current_password" => ["Mật khẩu hiện tại không chính xác"]
                ];

                return response()->json([
                    "message" => "Mật khẩu hiện tại không chính xác",
                    "errors" => $errors
                ], 422);
            }
        }

        // update customer
        $customer->name = $request->fullname;
        $customer->mobile = $request->mobile;
        if ($request->new_password) {
            $customer->password = Hash::make($request->new_password);
        }
        $customer->save();

        return $customer;
    }

    // cập nhật địa chỉ giao hàng mặc định
    public function updateShippingAddress(Request $request)
    {

    }
}
