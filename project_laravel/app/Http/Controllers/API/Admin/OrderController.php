<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    // Lấy danh sách đơn hàng
    public function getOrders(Request $request)
    {


        // $created_date = $this->getDate();

        $orders = Order::orderBy('id', "DESC")->get();

        $data = [];
        foreach ($orders as $order) {
            $data[] = array(
                "order_id" => $order->id,
                "customer_name" => $order->customer->name,
                "customer_mobile" => $order->customer->mobile,
                "customer_email" => $order->customer->email,
                "order_status" => $order->status->description,
                "created_date" => $order->created_date,
                "payment_method" => $order->payment_method == 0 ? "COD" : "Bank",
                "shipping_fullname" => $order->shipping_fullname,
                "shipping_mobile" => $order->shipping_mobile,
                "delivered_date" => $order->delivered_date,
                "shipping_fee" => $order->shipping_fee,
                "sub_total" => $this->getSubTotal($order->id),
                "total" => $order->shipping_fee + $this->getSubTotal($order->id),
                "shipping_housenumber_street" => $order->shipping_housenumber_street,
                "staff_name" => $order->staff->name ?? null

            );
        }

        return $data;
    }

    // Thống kê số lượng : đơn hàng, doanh thu, đơn hàng đã hủy
    public function getStatistical()
    {
        $revenue = 0;
        $order_canceled = 0;
        $orders = Order::all();

        foreach ($orders as $order) {
            if ($order->order_status_id != 6) {
                $revenue += $this->getSubTotal($order->id);
            } else {
                $order_canceled++;
            }
        }

        return response()->json([
            "order_total" => count($orders),
            "revenue" => $revenue,
            "order_canceled" => $order_canceled
        ]);
    }

    // Tính tổng tiền phụ
    private function getSubTotal($order_id)
    {
        $order_items = OrderItem::where("order_id", $order_id)->get();
        $subTotal = 0;
        foreach ($order_items as $order_item) {
            $subTotal += $order_item->total_price;
        }

        return $subTotal;
    }

    // Lấy ngày của đơn hàng
    private function getDate()
    {
        $created_date = date("Y-m-d"); // mặc định là ngày hôm nay

        if (request()->input("today")) $created_date = request()->input("today");

        if (request()->input("yesterday")) $created_date = request()->input("yesterday");

        if (request()->input("this_week")) $created_date = request()->input("this_week");

        if (request()->input("this_month")) $created_date = request()->input("this_month");

        if (request()->input("3_month")) $created_date = request()->input("3_months");

        if (request()->input("this_year")) $created_date = request()->input("this_year");

        if(request()->input("from_day")) $created_date = request()->input("from_day");

        return $created_date;
    }
}
