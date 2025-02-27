import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosNonAuthInstance } from '../../helper/util';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function DeliveryInfo({ loggedUser }) {

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // lấy danh sách tỉnh/thành phố
    const getProvinces = async () => {
        try {
            const response = await axiosNonAuthInstance().get('/site/provinces');
            setProvinces(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // lấy danh sách quận/huyện
    const getDistricts = async (province_id) => {
        try {
            const response = await axiosNonAuthInstance().get(`/site/districts/${province_id}`);
            setDistricts(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // lấy danh sách phường/xã
    const getWards = async (district_id) => {
        try {
            const response = await axiosNonAuthInstance().get(`/site/wards/${district_id}`);
            setWards(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getProvinces();
        getDistricts(loggedUser.province_id);
        getWards(loggedUser.district_id);
        // eslint-disable-next-line
    }, [])

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            fullname: loggedUser.name,
            mobile: loggedUser.mobile,
            province: loggedUser.province_id,
            district: loggedUser.district_id,
            ward: loggedUser.ward_id,
            address: loggedUser.housenumber_street,
            payment_method: '0' // COD mặc định
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('Vui lòng nhập họ tên'),
            mobile: Yup.string()
                .required('Vui lòng nhập số điện thoại'),
            province: Yup.string()
                .required('Vui lòng chọn tỉnh/thành phố'),
            district: Yup.string()
                .required('Vui lòng chọn quận/huyện'),
            ward: Yup.string()
                .required('Vui lòng chọn phường/xã'),
            address: Yup.string()
                .required('Vui lòng nhập địa chỉ nhà và tên đường'),

        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async values => {
            try {
                console.log(values);
            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    // thay đổi tỉnh/thành phố
    const handleChangeProvince = (e) => {
        formik.handleChange(e);
        getDistricts(e.target.value);
        setWards([]);
    }

    // thay đổi quận/huyện
    const handleChangeDistrict = (e) => {
        formik.handleChange(e);
        getWards(e.target.value);
    }


    return (
        <>
            <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                <div className="row">

                    {/* Fullname */}
                    <div className="form-group col-sm-6">
                        <input type="text" className="form-control" name="fullname"
                            onChange={formik.handleChange} value={formik.values.fullname} onBlur={formik.handleBlur} />
                        {
                            formik.touched.fullname && formik.errors.fullname ?
                                <div className='text-danger'>{formik.errors.fullname}</div> : null
                        }
                    </div>

                    {/* Mobile */}
                    <div className="form-group col-sm-6">
                        <input type="tel" className="form-control" name="mobile" placeholder="Số điện thoại"
                            onChange={formik.handleChange} value={formik.values.mobile} onBlur={formik.handleBlur} />
                        {
                            formik.touched.mobile && formik.errors.mobile ?
                                <div className='text-danger'>{formik.errors.mobile}</div> : null
                        }
                    </div>

                    {/* Provinces */}
                    <div className="form-group col-sm-4">
                        <select name="province" className="form-control province"
                            onChange={handleChangeProvince} value={formik.values.province} onBlur={formik.handleBlur}>
                            <option value>Tỉnh / thành phố</option>
                            {
                                provinces.map((province, index) =>
                                    <option value={province.id}>{province.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group col-sm-4">
                        <select name="district" className="form-control district"
                            onChange={handleChangeDistrict} value={formik.values.district} onBlur={formik.handleBlur} >
                            <option value>Quận / huyện</option>
                            {
                                districts.map((district, index) =>
                                    <option value={district.id}>{district.name}</option>
                                )
                            }

                        </select>
                    </div>
                    <div className="form-group col-sm-4">
                        <select name="ward" className="form-control ward"
                            onChange={formik.handleChange} value={formik.values.ward} onBlur={formik.handleBlur} >
                            <option value>Phường / xã</option>
                            {
                                wards.map((ward, index) =>
                                    <option value={ward.id}>{ward.name}</option>
                                )
                            }

                        </select>
                    </div>

                    <div className="form-group col-sm-12">
                        <input type="text" defaultValue="278 Hòa Bình" className="form-control" placeholder="Địa chỉ" name="address"
                            onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} />
                        {
                            formik.touched.address && formik.errors.address ?
                                <div className='text-danger'>{formik.errors.address}</div> : null
                        }
                    </div>
                </div>

                <h4>Phương thức thanh toán</h4>
                <div className="form-group">
                    <label><input onChange={formik.handleChange}  type="radio" name="payment_method" defaultChecked defaultValue={0} /> Thanh toán khi giao hàng (COD) </label>
                    <div />
                </div>

                <div className="form-group">
                    <label>
                        <input onChange={formik.handleChange} type="radio" name="payment_method" defaultValue={1} /> Chuyển khoản qua ngân hàng 
                    </label>
                    <div className="bank-info">STK: 0421003707901<br />Chủ TK: Nguyễn Hữu Lộc. Ngân hàng: Vietcombank TP.HCM <br />
                        Ghi chú chuyển khoản là tên và chụp hình gửi lại cho shop dễ kiểm tra ạ
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-sm btn-primary pull-right">Hoàn tất đơn hàng</button>
                </div>
            </form>
        </>
    )
}
