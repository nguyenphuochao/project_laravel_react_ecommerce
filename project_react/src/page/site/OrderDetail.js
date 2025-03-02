import React, { useEffect, useState } from 'react'
import AsideOrder from '../../component/site/AsideOrder'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosAuthInstance } from '../../helper/util';
import { Helmet } from 'react-helmet';
import OrderInfo from '../../component/site/OrderInfo';
import Loading from '../../component/site/Loading';

export default function OrderDetail() {
    const { slug } = useParams();
    const orderID = slug;

    const [order, setOrder] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)

    const getOrder = async () => {
        try {
            const response = await axiosAuthInstance().get(`/site/order_history/${orderID}`);
            setOrder(response.data);
            setIsLoaded(true);
        } catch (error) {
            toast.error(error.message);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        getOrder();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Helmet>
                <title>Chi tiết đơn hàng - {orderID}</title>
            </Helmet>

            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><Link to="/" target="_self">Trang chủ</Link></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tài khoản</span></li>
                            </ol>
                        </div>
                        <div className="clearfix" />

                        <AsideOrder />

                        <div className="col-md-9 order-info">

                            {
                                !isLoaded ? <Loading /> : <OrderInfo order={order} />
                            }
                            
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
