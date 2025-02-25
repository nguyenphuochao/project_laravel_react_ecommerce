import { Link } from 'react-router-dom';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../../helper/util';

export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.CartReducer.cartItems);
    const totalPrice = cart.reduce((total, item) => total + Number(item.sale_price * item.qty), 0); // tổng tiền cart

    const deleteProductInCart = (id) => {
        const action = { type: "REMOVE_FROM_CART", payload: { id : id} }
        dispatch(action);
    }

    const updateProductInCart = (id, qty) => {
        const action = { type: "UPDATE_FROM_CART", payload: { id: id, qty: qty } };
        dispatch(action);
    }

    return (
        <>
            <div className="modal fade" id="modal-cart-detail" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header bg-color">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">x</button>
                            <h3 className="modal-title text-center">Giỏ hàng</h3>
                        </div>

                        <div className="modal-body">
                            <div className="page-content">
                                <div className="clearfix hidden-sm hidden-xs">
                                    <div className="col-xs-1">
                                    </div>
                                    <div className="col-xs-3">
                                        <div className="header">
                                            Sản phẩm
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <div className="header">
                                            Đơn giá
                                        </div>
                                    </div>
                                    <div className="label_item col-xs-3">
                                        <div className="header">
                                            Số lượng
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <div className="header">
                                            Thành tiền
                                        </div>
                                    </div>
                                    <div className="lcol-xs-1">
                                    </div>
                                </div>
                                <div className="cart-product">
                                    {
                                        cart.map((item, index) =>
                                            <>
                                                <hr />
                                                <div className="clearfix text-left">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-1">
                                                            <div><img className="img-responsive" src={item.featured_image} alt={item.name} /></div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-3"><Link className="product-name" to="#">{item.name}</Link></div>
                                                        <div className="col-sm-6 col-md-2"><span className="product-item-discount">{formatMoney(item.sale_price)}₫</span></div>
                                                        <div className="col-sm-6 col-md-3"><input type="number" onChange={(e) => updateProductInCart(item.id, e.target.value)} min={1} value={item.qty} /></div>
                                                        <div className="col-sm-6 col-md-2"><span>{formatMoney(item.qty * item.sale_price)}₫</span></div>
                                                        <div className="col-sm-6 col-md-1"><Link className="remove-product" href="#" onClick={() => deleteProductInCart(item.id)}><span className="glyphicon glyphicon-trash" /></Link></div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="clearfix">
                                <div className="col-xs-12 text-right">
                                    <p>
                                        <span>Tổng tiền : </span>
                                        <span className="price-total">{formatMoney(totalPrice)}₫</span>
                                    </p>
                                    <input type="button" name="back-shopping" className="btn btn-default" defaultValue="Tiếp tục mua sắm" />
                                    <input type="button" name="checkout" className="btn btn-primary" defaultValue="Đặt hàng" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
