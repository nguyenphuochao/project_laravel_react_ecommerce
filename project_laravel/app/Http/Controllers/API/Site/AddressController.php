<?php

namespace App\Http\Controllers\API\Site;

use App\Http\Controllers\Controller;
use ErrorException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    // danh sách tỉnh/thành phố
    public function getProvinces()
    {
        $provinces = DB::table('province')->get();
        return $this->convertToAssociateArray($provinces);
    }

    // danh sách quận/huyện
    public function getDistrics()
    {
        $province_id = request()->input('province_id');
        if ($province_id) {
            $districts = DB::table("district")->where("province_id", $province_id)->get();
            return $this->convertToAssociateArray($districts);
        }

        return [];
    }

    // danh sách phường/xã
    public function getWards()
    {
        $district_id = request()->input('district_id');
        if ($district_id) {
            $wards = DB::table("ward")->where("district_id", $district_id)->get();
            return $this->convertToAssociateArray($wards);
        }

        return [];
    }

    // phí vận chuyển
    public function getShippingFee()
    {
        try {
            $province_id = request()->input('province_id');
            $transport = DB::table("transport")->where("province_id", $province_id)->first();
            echo $transport->price;
        } catch (\Throwable $th) {
            if ($th instanceof ErrorException) {
                echo "Dữ liệu không hợp lệ";
                exit;
            }

            echo $th->getMessage();
        }
    }

    // chuyển đổi sang mảng kết hợp
    private function convertToAssociateArray($objects)
    {
        $array = [];
        foreach ($objects as $object) {
            $array[] = array(
                "id" => $object->id,
                "name" => $object->name
            );
        }

        return $array;
    }
}
