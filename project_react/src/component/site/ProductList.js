import React from 'react'
import { Link } from 'react-router-dom'
import { axiosNonAuthInstance, formatMoney } from '../../helper/util'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function ProductList({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = async (id) => {

        try {
            const response = await axiosNonAuthInstance().get(`/site/products/${id}`);
            const product = response.data;
            const item = {
                id: product.product_id,
                name: product.product_name,
                featured_image: product.featured_image,
                sale_price: product.sale_price,
                qty: 1
            };

            // tạo action để dispatch lên store
            const action = { type: "ADD_TO_CART", payload: item }
            dispatch(action);
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="product-container">
                <div className="image">
                    <img className="img-responsive" src={product.featured_image} alt="" />
                </div>
                <div className="product-meta">
                    <h5 className="name">
                        <Link className="product-name" to={`/chi-tiet-san-pham/${product.product_id}`} title={product.product_name}>{product.product_name}</Link>
                    </h5>
                    <div className="product-item-price">
                        {
                            product.price !== product.sale_price ?
                                <>
                                    <span className="product-item-regular">{formatMoney(product.price)}₫</span>
                                    <span className="product-item-discount">{formatMoney(product.sale_price)}₫</span>
                                </>
                                :
                                <span className="product-item-discount">{formatMoney(product.sale_price)}₫</span>
                        }

                    </div>
                </div>
                <div className="button-product-action clearfix">
                    <div className="cart icon">
                        <Link className="btn btn-outline-inverse buy" onClick={() => handleAddToCart(product.product_id)} to="#" title="Thêm vào giỏ">
                            Thêm vào giỏ <i className="fa fa-shopping-cart" />
                        </Link>
                    </div>
                    <div className="quickview icon">
                        <Link className="btn btn-outline-inverse" to={`/san-pham/chi-tiet-san-pham-${product.product_id}.html`} title="Xem nhanh">
                            Xem chi tiết <i className="fa fa-eye" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
