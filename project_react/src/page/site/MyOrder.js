import React, { useEffect, useState } from 'react'
import AsideOrder from '../../component/site/AsideOrder'
import { axiosAuthInstance } from '../../helper/util';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loading from '../../component/site/Loading';
import { Helmet } from 'react-helmet';

export default function MyOrder() {
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);

    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const getOrders = async () => {
        try {
            const response = await axiosAuthInstance().get(`/site/order_history?customer_id=${loggedUser.id}`);
            setOrders(response.data);
            setIsLoaded(true);
        } catch (error) {
            toast.error(error.message);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Helmet>
                <title>Đơn hàng của tôi</title>
            </Helmet>
            
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tài khoản</span></li>
                            </ol>
                        </div>
                        <div className="clearfix" />

                        {/* Sidebar Order */}
                        <AsideOrder />

                        <div className="col-md-9 order">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Đơn hàng của tôi</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-12">
                                    {
                                        !isLoaded ? <Loading /> :

                                            orders.map((order, index) =>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5>Đơn hàng <Link to="chi-tiet-don-hang.html">#{order.order_id}</Link></h5>
                                                        <span className="date">
                                                            Ngày đặt hàng {order.created_date}
                                                        </span>
                                                        <hr />

                                                        {
                                                            order.items.map((item, index) =>
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <img src={item.featured_image} alt={item.name} className="img-responsive" />
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <a className="product-name" href="chi-tiet-san-pham.html">{item.name}</a>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        Số lượng: {item.qty}
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        {item.status}
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        Ngày giao hàng  {item.delivered_date}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            )
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
