import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { axiosNonAuthInstance, formatMoney } from '../../helper/util';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const [transport, setTransport] = useState(null);

    const is_login = useSelector(state => state.AuthReducer.isLogin);
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);

    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subTotal = cartItems.reduce((total, item) => total + Number(item.sale_price * item.qty), 0);
    const shipping_fee = transport;
    const total = subTotal + shipping_fee;

    // lấy danh sách tỉnh/thành phố
    const getProvinces = async () => {
        try {
            const response = await axiosNonAuthInstance().get('/site/provinces');
            setProvinces(response.data);
            setIsLoaded(true);
        } catch (error) {
            toast.error(error.message);
            setIsLoaded(true);
        }
    }

    // lấy danh sách quận/huyện
    const getDistricts = async (province_id) => {
        try {
            const response = await axiosNonAuthInstance().get(`/site/districts?province_id=${province_id}`);
            setDistricts(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // lấy danh sách phường/xã
    const getWards = async (district_id) => {
        try {
            const response = await axiosNonAuthInstance().get(`/site/wards?district_id=${district_id}`);
            setWards(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // lấy phí giao hàng theo tỉnh/thành phố
    const getTransport = async (province_id) => {
        try {
            const response = await axiosNonAuthInstance().get(`/site/transport/${province_id}`);
            setTransport(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProvinces();
        getDistricts(loggedUser?.province_id || '');
        getWards(loggedUser?.district_id || '');
        getTransport(loggedUser?.province_id || '');
        // eslint-disable-next-line
    }, [])

    // Gửi đơn hàng lên server
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            fullname: loggedUser?.shipping_name || '',
            mobile: loggedUser?.shipping_mobile || '',
            province_id: loggedUser?.province_id || '',
            district: loggedUser?.district_id || '',
            ward: loggedUser?.ward_id || '',
            address: loggedUser?.housenumber_street || '',
            payment_method: '0' // COD mặc định
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('Vui lòng nhập họ tên'),
            mobile: Yup.string()
                .required('Vui lòng nhập số điện thoại'),
            province_id: Yup.string()
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

                const data = {
                    loggedUser: loggedUser,
                    deliveryInfo: values,
                    cartItems: cartItems

                };
                
                const response = await axiosNonAuthInstance().post(`/site/order`, data);
                toast.success(response.data.message);

                const action = { type: "EMPTY_CART" };
                dispatch(action);

                navigate('/don-hang-cua-toi.html');
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
        getTransport(e.target.value);
    }

    // thay đổi quận/huyện
    const handleChangeDistrict = (e) => {
        formik.handleChange(e);
        getWards(e.target.value);
    }


    return (
        <>
            <Helmet>
                <title>Đặt hàng</title>
            </Helmet>

            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <ol className="breadcrumb">
                                <li><Link to="/" target="_self">Giỏ hàng</Link></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Thông tin giao hàng</span></li>
                            </ol>
                        </div>
                    </div>

                    <div className="row">
                        <aside className="col-md-6 cart-checkout">
                            {
                                cartItems.map((item, index) =>
                                    <>
                                        <div className="row">
                                            <div className="col-xs-2">
                                                <img className="img-responsive" src={item.featured_image} alt={item.name} />
                                            </div>
                                            <div className="col-xs-7">
                                                <a className="product-name" href="chi-tiet-san-pham.html">{item.name}</a>
                                                <br />
                                                <span>{item.qty}</span> x <span>{formatMoney(item.sale_price)}₫</span>
                                            </div>
                                            <div className="col-xs-3 text-right">
                                                <span>{formatMoney(item.qty * item.sale_price)}₫</span>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            }

                            {/* Tính tiền */}
                            <div className="row">
                                <div className="col-xs-6">
                                    Tạm tính
                                </div>
                                <div className="col-xs-6 text-right">
                                    {formatMoney(subTotal)}₫
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    Phí vận chuyển
                                </div>
                                <div className="col-xs-6 text-right">
                                    <span className="shipping-fee" data>{formatMoney(shipping_fee)}₫</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-xs-6">
                                    Tổng cộng
                                </div>
                                <div className="col-xs-6 text-right">
                                    <span className="payment-total"> {formatMoney(total)}₫₫</span>
                                </div>
                            </div>
                        </aside>

                        <div className="ship-checkout col-md-6">
                            <h4>Thông tin giao hàng</h4>
                            {
                                is_login ? null :
                                    <>
                                        <div>Bạn đã có tài khoản? <Link to="#" className="btn-login">Đăng Nhập</Link></div>
                                        <br />
                                    </>
                            }

                            {/* Form checkout */}
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
                                        <select name="province_id" className="form-control province"
                                            onChange={handleChangeProvince} value={formik.values.province_id} onBlur={formik.handleBlur}>
                                            {
                                                !isLoaded ? <option>Loading...</option>
                                                    :
                                                    <>
                                                        <option value>Tỉnh / thành phố</option>
                                                        {
                                                            provinces.map((province, index) =>
                                                                <option value={province.id}>{province.name}</option>
                                                            )
                                                        }
                                                    </>
                                            }

                                        </select>
                                    </div>

                                    <div className="form-group col-sm-4">
                                        <select name="district" className="form-control district"
                                            onChange={handleChangeDistrict} value={formik.values.district} onBlur={formik.handleBlur} >

                                            {
                                                !isLoaded ? <option>Loading...</option>
                                                    :
                                                    <>
                                                        <option value>Quận / huyện</option>
                                                        {
                                                            districts.map((district, index) =>
                                                                <option value={district.id}>{district.name}</option>
                                                            )
                                                        }
                                                    </>
                                            }

                                        </select>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <select name="ward" className="form-control ward"
                                            onChange={formik.handleChange} value={formik.values.ward} onBlur={formik.handleBlur} >

                                            {
                                                !isLoaded ? <option>Loading...</option>
                                                    :
                                                    <>
                                                        <option value>Phường / xã</option>
                                                        {
                                                            wards.map((ward, index) =>
                                                                <option value={ward.id}>{ward.name}</option>
                                                            )
                                                        }
                                                    </>
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
                                    <label><input onChange={formik.handleChange} type="radio" name="payment_method" defaultChecked defaultValue={0} /> Thanh toán khi giao hàng (COD) </label>
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

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
