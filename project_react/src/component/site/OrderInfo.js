import React from 'react'
import { formatMoney } from '../../helper/util'

export default function OrderInfo({ order }) {
    return (
        <>
            <div className="row">
                <div className="col-xs-6">
                    <h4 className="home-title">Đơn hàng #{order.order_id}</h4>
                </div>
                <div className="clearfix" />
                <aside className="col-md-7 cart-checkout">
                    {
                        order.order_item.items.map((item, index) =>

                            <>
                                <div className="row">
                                    <div className="col-xs-2">
                                        <img className="img-responsive" src={item.featured_image} alt={item.name} />
                                    </div>
                                    <div className="col-xs-7">
                                        <a className="product-name" href="chi-tiet-san-pham.html">{item.name}</a>
                                        <br />
                                        <span>{item.qty}</span> x <span>{formatMoney(item.unit_price)}₫</span>
                                    </div>
                                    <div className="col-xs-3 text-right">
                                        <span>{formatMoney(item.total_price)}₫</span>
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
                            {formatMoney(order.order_item.sub_total)}₫
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            Phí vận chuyển
                        </div>
                        <div className="col-xs-6 text-right">
                            {formatMoney(order.order_item.shipping_fee)}₫
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-6">
                            Tổng cộng
                        </div>
                        <div className="col-xs-6 text-right">
                            {formatMoney(order.order_item.total)}₫
                        </div>
                    </div>
                </aside>

                {/* Info Customer */}
                <div className="ship-checkout col-md-5">
                    <h4>Thông tin giao hàng</h4>
                    <div>
                        Họ và tên: {order.customer.shipping_fullname}
                    </div>
                    <div>
                        Số điện thoại: {order.customer.shipping_mobile}
                    </div>
                    <div>
                        {order.customer.province}
                    </div>
                    <div>
                        {order.customer.district}
                    </div>
                    <div>
                        {order.customer.ward}
                    </div>
                    <div>
                        {order.customer.shipping_housenumber_street}
                    </div>
                    <div>
                        Phương thức thanh toán: {order.customer.payment_method}
                    </div>
                </div>
            </div>
        </>
    )
}
