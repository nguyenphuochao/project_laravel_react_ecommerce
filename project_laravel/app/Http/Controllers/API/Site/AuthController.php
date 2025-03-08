<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // đăng nhập
    public function login(Request $request)
    {
        try {
            // validate
            $request->validate(
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ],
                [
                    'email.required' => 'Vui lòng nhập email',
                    'email.email' => 'Email chưa đúng định dạng',
                    'password.required' => 'Vui lòng nhập password'
                ]
            );

            $email = $request->email;
            $password = $request->password;

            $customer = Customer::where('email', $email)->first();
            if (!$customer || !Hash::check($password, $customer->password)) {
                return response()->json(['message' => 'Thông tin đăng nhập không chính xác'], 401);
            }

            // tạo token
            $token = $customer->createToken($customer->id)->plainTextToken;

            return response()->json([
                "customer" => $this->convertToAPICustomer($customer),
                "token" => $token
            ]);
        } catch (\Throwable $th) {

            if ($th instanceof ValidationException) {
                return response()->json([
                    'error' => $th->errors()
                ], Response::HTTP_BAD_REQUEST);
            }

            return response()->json([
                'error' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // đăng xuất
    public function logout()
    {
        try {
            request()->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logout success'
            ]);
        } catch (\Throwable $th) {

            return response()->json([
                'error' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // lấy thông tin customer đã login
    public function getCustomer(Request $request)
    {
        return $request->user();
    }

    private function convertToAPICustomer($object)
    {
        $data = array(
            "id" => $object->id,
            "name" => $object->name,
            "mobile" => $object->mobile,
            "email" => $object->email,
            "login_by" => $object->login_by,
            "province_id" => (string)$object->ward->district->province->id, // relationship
            "district_id" => (string)$object->ward->district->id, // relationship
            "ward_id" => $object->ward_id,
            "shipping_name" => $object->shipping_name,
            "shipping_mobile" => $object->shipping_mobile,
            "housenumber_street" => $object->housenumber_street,
            "is_active" => 1
        );

        return $data;
    }
}
