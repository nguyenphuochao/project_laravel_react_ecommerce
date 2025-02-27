import React from 'react'
import { Link } from 'react-router-dom'
import DeliveryInfo from '../../component/site/DeliveryInfo'
import { useSelector } from 'react-redux';
import { formatMoney } from '../../helper/util';

export default function Checkout() {
    const cart = useSelector(state => state.CartReducer.cartItems);
    const subTotal = cart.reduce((total, item) => total + Number(item.sale_price * item.qty), 0);
    const shipping_fee = 50000;
    const total = subTotal + shipping_fee;

    return (
        <>
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
                                cart.map((item, index) =>
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
                            <div>Bạn đã có tài khoản? <a href="javascript:void(0)" className="btn-login">Đăng Nhập</a></div>
                            <br />

                            {/* Form checkout */}
                            <DeliveryInfo />

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
