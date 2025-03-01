<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function order(Request $request)
    {
        DB::beginTransaction(); // tạo 1 giao dịch transaction

        try {
            // tạo order
            $order = new Order();
            $order->created_date = date("Y-m-d H:i:s");
            $order->order_status_id = 1;
            $order->staff_id = null;
            $order->customer_id = $request->loggedUser["id"] ?? 1; // không đăng nhập thì lưu 1 => khách vãng lai
            $order->shipping_fullname = $request->loggedUser["shipping_name"] ?? $request->deliveryInfo["fullname"];
            $order->shipping_mobile = $request->loggedUser["shipping_mobile"] ?? $request->deliveryInfo["mobile"];
            $order->payment_method = $request->deliveryInfo["payment_method"];
            $order->shipping_ward_id = $request->deliveryInfo["ward"];
            $order->shipping_housenumber_street = $request->deliveryInfo["address"];
            $order->shipping_fee = $this->getTransport($request->loggedUser["province_id"] ?? $request->deliveryInfo["province_id"]);
            $order->delivered_date = date("Y-m-d", strtotime("+3 days"));
            $order->save();

            // tạo order_item
            $cartItems = $request->cartItems;
            foreach ($cartItems as $item) {
                $order_item = new OrderItem();
                $order_item->product_id = $item["id"];
                $order_item->order_id = $order->id;
                $order_item->qty = $item["qty"];
                $order_item->unit_price = $item["sale_price"];
                $order_item->total_price = $item["qty"] * $item["sale_price"];
                $order_item->save();
            }

            // Commit nếu không có lỗi
            DB::commit();

            return response()->json([
                "message" => "Đã tạo đơn hàng thành công"
            ]);
        } catch (\Exception $e) {

            // Rollback nếu có lỗi
            DB::rollBack();

            return response()->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTransport()
    {
        $province_id = request()->input('province_id');
        $province = DB::table("province")->where("id", $province_id)->first();

        if($province) {
            $transport = DB::table("transport")->where("province_id", $province_id)->first();
            return $transport->price;
        }

        return 0;
    }
}
