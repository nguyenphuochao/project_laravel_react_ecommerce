import React from 'react'

export default function Account() {
    return (
        <>
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

                        <aside className="col-md-3">
                            <div className="inner-aside">
                                <div className="category">
                                    <ul>
                                        <li className="active">
                                            <a href="thong-tin-tai-khoan.html" title="Thông tin tài khoản" target="_self">Thông tin tài khoản
                                            </a>
                                        </li>
                                        <li className>
                                            <a href="dia-chi-giao-hang-mac-dinh.html" title="Địa chỉ giao hàng mặc định" target="_self">Địa chỉ giao hàng mặc định
                                            </a>
                                        </li>
                                        <li className>
                                            <a href="don-hang-cua-toi.html" target="_self">Đơn hàng của tôi
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                        
                        <div className="col-md-9 account">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Thông tin tài khoản</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-6">
                                    <form className="info-account" action="#" method="POST">
                                        <div className="form-group">
                                            <input type="text" defaultValue="Huu Loc" className="form-control" name="fullname" placeholder="Họ và tên" required oninvalid="this.setCustomValidity('Vui lòng nhập tên của bạn')" oninput="this.setCustomValidity('')" />
                                        </div>
                                        <div className="form-group">
                                            <input type="tel" defaultValue={"0932538468"} className="form-control" name="mobile" placeholder="Số điện thoại" required pattern="[0][0-9]{9,}" oninvalid="this.setCustomValidity('Vui lòng nhập số điện thoại bắt đầu bằng số 0 và ít nhất 9 con số theo sau')" oninput="this.setCustomValidity('')" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu mới" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" oninvalid="this.setCustomValidity('Vui lòng nhập ít nhất 8 ký tự: số, chữ hoa, chữ thường')" oninput="this.setCustomValidity('')" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="re-password" placeholder="Nhập lại mật khẩu mới" autoComplete="off" autoSave="off" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" oninvalid="this.setCustomValidity('Vui lòng nhập ít nhất 8 ký tự: số, chữ hoa, chữ thường')" oninput="this.setCustomValidity('')" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary pull-right">Cập nhật</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
