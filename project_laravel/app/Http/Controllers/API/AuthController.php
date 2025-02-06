<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
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

            $staff = Staff::where('email', $email)->first();
            if (!$staff || !Hash::check($password, $staff->password)) {
                return response()->json(['message' => 'Thông tin đăng nhập không chính xác'], 401);
            }

            // tạo token
            $token = $staff->createToken($staff->id)->plainTextToken;

            return response()->json([
                "staff" => $staff,
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

    public function getStaff(Request $request)
    {
        return $request->user();
    }
}
