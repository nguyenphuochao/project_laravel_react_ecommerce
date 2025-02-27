<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function order(Request $request)
    {
        $order = new Order();
        $order->created_at = date("Y-m-d H:i:s");
        $order->customer = $request->loggedUser["id"];
    }
}
