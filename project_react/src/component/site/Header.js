import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import SearchForm from './SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.CartReducer.cartItems);
    const is_login = useSelector(state => state.AuthReducer.isLogin);
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);
    const totalCart = cart.reduce((total, item) => total + Number(item.qty), 0); // tổng số lượng cart

    const openMenuMobile = () => {
        document.querySelector('.menu-mb').style.width = "250px";
        document.querySelector('.btn-menu-mb').style.width = "0px";
    }

    const closeMenuMobile = () => {
        document.querySelector('.menu-mb').style.width = "0px";
        document.querySelector('.btn-menu-mb').style.width = "250px";
    }

    // mở popup cart
    const openPopupCart = (e) => {
        e.preventDefault();
        const action = { type: "POPUP_CART" };
        dispatch(action);
    }

    // mở popup login
    const openPopupLogin = (e) => {
        e.preventDefault();
        const action = { type: "POPUP_LOGIN" };
        dispatch(action);
    }

    // mở popup register
    const openPopupRegister = (e) => {
        e.preventDefault();
        const action = { type: "POPUP_REGISTER" };
        dispatch(action);
    }

    // đăng xuất
    const handleLogout = (e) => {
        e.preventDefault();
        const action = { type: "LOGOUT" };
        dispatch(action);
        navigate('/');
        
    }


    return (
        <>
            <header>
                {/* use for ajax */}
                <input type="hidden" id="reference" defaultValue />

                {/* Top Navbar */}
                <div className="top-navbar container-fluid">
                    <div className="menu-mb">
                        <Link to="#" className="btn-close" onClick={closeMenuMobile}>×</Link>
                        <a className="active" href="index.html">Trang chủ</a>
                        <a href="san-pham.html">Sản phẩm</a>
                        <a href="chinh-sach-doi-tra.html">Chính sách đổi trả</a>
                        <a href="chinh-sach-thanh-toan.html">Chính sách thanh toán</a>
                        <a href="chinh-sach-giao-hang.html">Chính sách giao hàng</a>
                        <a href="lien-he.html">Liên hệ</a>
                    </div>
                    <div className="row">
                        <div className="hidden-lg hidden-md col-sm-2 col-xs-1">
                            <span className="btn-menu-mb" onClick={openMenuMobile}><i className="glyphicon glyphicon-menu-hamburger" /></span>
                        </div>
                        <div className="col-md-6 hidden-sm hidden-xs">
                            <ul className="list-inline">
                                <li><a href="https://www.facebook.com/HocLapTrinhWebTaiNha.ThayLoc"><i className="fab fa-facebook-f" /></a></li>
                                <li><a href="https://twitter.com"><i className="fab fa-twitter" /></a></li>
                                <li><a href="https://www.instagram.com"><i className="fab fa-instagram" /></a></li>
                                <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest" /></a></li>
                                <li><a href="https://www.youtube.com/"><i className="fab fa-youtube" /></a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-sm-10 col-xs-11">
                            <ul className="list-inline pull-right top-right">
                                {
                                    !is_login ?
                                        <>
                                            <li className="account-login">
                                                <Link onClick={(e) => openPopupRegister(e)} to="#" className="btn-register">Đăng Ký</Link>
                                            </li>
                                            <li>
                                                <Link onClick={(e) => openPopupLogin(e)} to="#" className="btn-login">Đăng Nhập</Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li class="account-login">
                                                <Link to="/don-hang-cua-toi.html" class="btn-logout">Đơn hàng của tôi</Link>
                                            </li>
                                            <li>
                                                <Link href="#" class="btn-account dropdown-toggle" data-toggle="dropdown" id="dropdownMenu">{loggedUser.name}</Link>
                                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
                                                    <li><a href="thong-tin-tai-khoan.html">Thông tin tài khoản</a></li>
                                                    <li><a href="dia-chi-giao-hang-mac-dinh.html">Địa chỉ giao hàng</a></li>
                                                    <li><a href="don-hang-cua-toi.html">Đơn hàng của tôi</a></li>
                                                    <li role="separator" class="divider"></li>
                                                    <li><Link onClick={(e) => handleLogout(e)} to="#">Thoát</Link></li>
                                                </ul>
                                            </li>
                                        </>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                {/* End top navbar */}

                {/* Header */}
                <div className="container">
                    <div className="row">
                        {/* LOGO */}
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 logo">
                            <Link to="#"><img src="../site/images/goda450x170_1.jpg" className="img-responsive" alt="" /></Link>
                        </div>
                        <div className="col-lg-4 col-md-4 hidden-sm hidden-xs call-action">
                            <Link to="#"><img src="../images/godakeben450x170.jpg" className="img-responsive" alt="" /></Link>
                        </div>
                        {/* HOTLINE AND SERCH */}
                        <div className="col-lg-4 col-md-4 hotline-search">
                            <div>
                                <p className="hotline-phone"><span><strong>Hotline: </strong><a href="tel:0932.538.468">0932.538.468</a></span></p>
                                <p className="hotline-email"><span><strong>Email: </strong><a href="mailto:nguyenhuulocla2006@gmail.com">nguyenhuulocla2006@gmail.com</a></span></p>
                            </div>

                            {/* Search Form */}
                            <SearchForm />
                        </div>
                    </div>
                </div>
            </header>
            {/* End header */}

            {/* NAVBAR DESKTOP*/}
            <nav className="navbar navbar-default desktop-menu">
                <div className="container">
                    <ul className="nav navbar-nav navbar-left hidden-sm hidden-xs">
                        <li>
                            <NavLink to="/">Trang chủ</NavLink>
                        </li>
                        <li><NavLink to="/san-pham.html">Sản phẩm </NavLink></li>
                        <li><NavLink to="/chinh-sach-doi-tra.html">Chính sách đổi trả</NavLink></li>
                        <li><NavLink to="/chinh-sach-thanh-toan.html">Chính sách thanh toán</NavLink></li>
                        <li><NavLink to="/chinh-sach-giao-hang.html">Chính sách giao hàng</NavLink></li>
                        <li><NavLink to="/lien-he.html">Liên hệ</NavLink></li>
                    </ul>
                    <span className="hidden-lg hidden-md experience">Trải nghiệm cùng sản phẩm của Goda</span>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="cart"><Link onClick={(e) => openPopupCart(e)} to="#" className="btn-cart-detail" title="Giỏ Hàng"><i className="fa fa-shopping-cart" /> <span className="number-total-product">{totalCart}</span></Link></li>
                    </ul>
                </div>
            </nav>
            {/* END NAVBAR DESKTOP*/}

            <ToastContainer />
        </>
    )
}
