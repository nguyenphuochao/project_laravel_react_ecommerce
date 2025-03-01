<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    // Đặt hàng
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

    // Phí giao hàng theo tỉnh/thành phố
    public function getTransport()
    {
        $province_id = request()->input('province_id');
        $province = DB::table("province")->where("id", $province_id)->first();

        if ($province) {
            $transport = DB::table("transport")->where("province_id", $province_id)->first();
            return $transport->price;
        }

        return 0;
    }

    // Lịch sử mua hàng
    public function getOrderHistory()
    {
        $customer_id = request()->input("customer_id");
        $orders = Order::where("customer_id", $customer_id)->orderBy('id', 'desc')->get();

        $data = [];

        foreach ($orders as $order) {
            $data[] = array(
                "order_id" => $order->id,
                "created_date" => $order->created_date,
                "items" => $this->getOrderItems($order->id)
            );
        }

        return $data;
    }

    // Chi tiết lịch sử mua hàng
    public function getOrderHistoryDetail($id)
    {
        $order = Order::where("id", $id)->first();

        $data["order_id"] = $order->id;

        $data["customer"] = [
            "shipping_fullname" => $order->shipping_fullname,
            "shipping_mobile" => $order->shipping_mobile,
            "province" => $order->ward->district->province->name,
            "district" => $order->ward->district->name,
            "ward" => $order->ward->name,
            "shipping_housenumber_street" => $order->shipping_housenumber_street,
            "payment_method" => $order->payment_method == 0 ? "COD" : "Bank"
        ];

        $data["order_item"] = [
            "items" => $this->getOrderItems($order->id),
            "sub_total" => $this->subTotal($order->id),
            "shipping_fee" => $order->shipping_fee,
            "total" => $order->shipping_fee + $this->subTotal($order->id)
        ];

        return $data;
    }

    // Tính tổng tiền phụ
    private function subTotal($order_id)
    {
        $total = 0;
        foreach ($this->getOrderItems($order_id) as $item) {
            $total += $item["total_price"];
        }

        return $total;
    }

    // Danh sách chi tiết đơn hàng
    private function getOrderItems($order_id)
    {
        $baseUrl = request()->getSchemeAndHttpHost();
        $data = [];
        $order_items = OrderItem::where("order_id", $order_id)->get();

        foreach ($order_items as $order_item) {
            $data[] = array(
                "featured_image" => $baseUrl . "/uploads/" . $order_item->product->featured_image,
                "name" => $order_item->product->name,
                "qty" => $order_item->qty,
                "unit_price" => $order_item->unit_price,
                "total_price" => $order_item->total_price,
                "status" => $order_item->order->status->description,
                "delivered_date" => $order_item->order->delivered_date
            );
        }

        return $data;
    }
}
