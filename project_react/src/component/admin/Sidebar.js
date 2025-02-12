import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

export default function Sidebar() {
    const location = useLocation();
    const pathname = location.pathname;


    return (
        <>
            <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/admin"><i className="fas fa-fw fa-tachometer-alt" /> <span>Tổng quan</span></Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-shopping-cart" /> <span>Đơn hàng</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/order/list.html">Danh sách</a>
                        <a className="dropdown-item" href="../../pages/order/add.html">Thêm</a>
                    </div>
                </li>
                
                <li className={`nav-item dropdown`}>
                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" id><i className="fab fa-product-hunt" /> <span>Sản phẩm</span></Link>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/admin/product/list">Danh sách</Link>
                        <Link className="dropdown-item" to="/admin/product/add">Thêm</Link>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-comments" /> <span>Comment</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/comment/list.html">Danh sách</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="far fa-image" /> <span>Hình ảnh</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/image/list.html">Danh sách</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-user-alt" /> <span>Khách hàng</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/customer/list.html">Danh sách</a>
                        <a className="dropdown-item" href="../../pages/customer/add.html">Thêm</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-folder" /> <span>Danh mục</span></Link>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/admin/category/list">Danh sách</Link>
                        <Link className="dropdown-item" to="/admin/category/add">Thêm</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-percentage" /> <span>Khuyến mãi</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/promotion/list.html">Danh sách</a>
                        <a className="dropdown-item" href="../../pages/promotion/add.html">Thêm</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-shipping-fast" /> <span>Phí giao hàng</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/transport/list.html">Danh sách</a>
                        <a className="dropdown-item" href="../../pages/transport/add.html">Thêm</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-users" /> <span>Nhân viên</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/staff/list.html">Danh sách</a>
                        <a className="dropdown-item" href="../../pages/staff/add.html">Thêm</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-user-shield" /> <span>Phân quyền</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/permission/roles.html">Danh sách vai trò</a>
                        <a className="dropdown-item" href="../../pages/permission/add_role.html">Thêm vai trò</a>
                        <a className="dropdown-item" href="../../pages/permission/actions.html">Danh sách tác vụ</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../../pages/order_status/list.html"><i className="fas fa-star-half-alt" /> <span>Trạng thái đơn hàng</span></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id><i className="fas fa-file-alt" /> <span>News letter</span></a>
                    <div className="dropdown-menu" aria-labelledby>
                        <a className="dropdown-item" href="../../pages/newsletter/list.html">Danh sách</a>
                        <a className="dropdown-item" href="../../pages/newsletter/send.html">Gởi mail</a>
                    </div>
                </li>
            </ul>
        </>
    )
}
