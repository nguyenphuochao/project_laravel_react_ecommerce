import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { axiosAuthInstance } from '../../../helper/util';
import Loading from '../../../component/admin/Loading';
import axios from 'axios';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [statistical, setStatistical] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getOrders = async () => {
    try {
      const response = await axiosAuthInstance().get('/orders');
      setOrders(response.data);
      setIsLoaded(true)
    } catch (error) {
      toast.error(error.message);
      setIsLoaded(true)
    }
  }

  const getStatistical = async () => {
      const response = await axiosAuthInstance().get('/orders/getStatistical');
      setStatistical(response.data);
  }

  useEffect(() => {
    getOrders();
    getStatistical();
  }, [])

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div id="content-wrapper">
        <div className="container-fluid">
          {/* Breadcrumbs*/}
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Tổng quan</li>
          </ol>

          <div className="mb-3 my-3">
            <Link to="#" className="active btn btn-primary mr-1">Hôm nay</Link>
            <Link to="#" className="btn btn-primary mr-1">Hôm qua</Link>
            <Link to="#" className="btn btn-primary mr-1">Tuần này</Link>
            <Link to="#" className="btn btn-primary mr-1">Tháng này</Link>
            <Link to="#" className="btn btn-primary mr-1">3 tháng</Link>
            <Link to="#" className="btn btn-primary mr-1">Năm này</Link>
            <div className="dropdown" style={{ display: 'inline-block' }}>
              <Link className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div style={{ margin: 20 }}>
                  Từ ngày <input type="date" className="form-control" id="usr" />
                  Đến ngày <input type="date" className="form-control" id="usr" />
                  <br />
                  <input type="submit" defaultValue="Tìm" className="btn btn-primary form-control" />
                </div>
              </div>
            </div>
          </div>

          {/* Icon Cards*/}
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-list" />
                  </div>
                  <div className="mr-5">{statistical?.order_total} Đơn hàng</div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="#">
                  <span className="float-left">Chi tiết</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-shopping-cart" />
                  </div>
                  <div className="mr-5">Doanh thu {statistical?.revenue} đ</div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="#">
                  <span className="float-left">Chi tiết</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-life-ring" />
                  </div>
                  <div className="mr-5">{statistical?.order_canceled} đơn hàng bị hủy</div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="#">
                  <span className="float-left">Chi tiết</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* DataTables Example */}
          <div className="card mb-3">
            <div className="card-header">
              <i className="fas fa-table" />
              &nbsp; Đơn hàng
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover" width="100%" cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên khách hàng</th>
                      <th>Điện thoai</th>
                      <th>Email</th>
                      <th>Trạng Thái</th>
                      <th>Ngày đặt hàng</th>
                      <th>Phương thức thanh toán</th>
                      <th>Người nhận</th>
                      <th>Số điện thoại nhận</th>
                      <th>Ngày giao hàng</th>
                      <th>Phí giao hàng</th>
                      <th>Tạm tính</th>
                      <th>Tổng cộng</th>
                      <th>Địa chỉ giao hàng</th>
                      <th>Nhân viên phụ trách</th>
                      <th />
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !isLoaded ? <Loading /> :
                        orders.map((order, index) =>
                          <tr key={index}>
                            <td>#{order.order_id}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.customer_mobile}</td>
                            <td>{order.customer_email}</td>
                            <td>{order.order_status}</td>
                            <td>{order.created_date}</td>
                            <td>{order.payment_method}</td>
                            <td>{order.shipping_fullname}</td>
                            <td>{order.shipping_mobile}</td>
                            <td>{order.delivered_date}</td>
                            <td>{order.shipping_fee} đ</td>
                            <td>{order.sub_total} đ</td>
                            <td>{order.total} đ</td>
                            <td>{order.shipping_housenumber_street}</td>
                            <td>{order.staff_name}</td>
                            {
                              order.order_status === 'Đã đặt hàng' ? <td><input type="button" onclick="Confirm('1');" defaultValue="Xác nhận" className="btn btn-primary btn-sm" /></td> : null
                            }
                            <td><input type="button" onclick="Edit('1');" defaultValue="Sửa" className="btn btn-warning btn-sm" /></td>
                            <td><input type="button" onclick="Delete('1');" defaultValue="Xóa" className="btn btn-danger btn-sm" /></td>
                          </tr>
                        )
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
