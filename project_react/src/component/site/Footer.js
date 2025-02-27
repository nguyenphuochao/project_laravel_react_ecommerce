import React from 'react'
import Cart from './Cart'
import LoginForm from './LoginForm'

export default function Footer() {
  return (
    <>
      <div>
        {/* FOOTER */}
        <footer className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-4 list">
                    <div className="footerLink">
                      <h4>Danh mục</h4>
                      <ul className="list-unstyled">
                        <li><a href="#">Kem Chống Nắng </a></li>
                        <li><a href="#">Kem Dưỡng Da </a></li>
                        <li><a href="#">Kem Trị Mụn </a></li>
                        <li><a href="#">Kem Trị Thâm Nám </a></li>
                        <li><a href="#">Sữa Rửa Mặt </a></li>
                        <li><a href="#">Sữa Tắm </a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-4 list">
                    <div className="footerLink">
                      <h4>Liên kết </h4>
                      <ul className="list-unstyled">
                        <li><a href="san-pham.html">Sản phẩm </a></li>
                        <li><a href="chinh-sach-doi-tra.html">Chính sách đổi trả</a></li>
                        <li><a href="chinh-sach-thanh-toan.html">Chính sách thanh toán</a></li>
                        <li><a href="chinh-sach-giao-hang.html">Chính sách giao hàng </a></li>
                        <li><a href="lien-he.html">Liên hệ </a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-4 list">
                    <div className="footerLink">
                      <h4>Liên hệ với chúng tôi </h4>
                      <ul className="list-unstyled">
                        <li>Phone: 0932.538.468</li>
                        <li><a href="mailto:nguyenhuulocla2006@gmail.com">Mail: nguyenhuulocla2006@gmail.com</a></li>
                      </ul>
                      <ul className="list-inline">
                        <li><a href="https://www.facebook.com/HocLapTrinhWebTaiNha.ThayLoc"><i className="fab fa-facebook-f" /></a></li>
                        <li><a href="https://twitter.com"><i className="fab fa-twitter" /></a></li>
                        <li><a href="https://www.instagram.com"><i className="fab fa-instagram" /></a></li>
                        <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest" /></a></li>
                        <li><a href="https://www.youtube.com/"><i className="fab fa-youtube" /></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-12 list">
                    <div className="newsletter clearfix">
                      <h4>Bản tin</h4>
                      <p>Nhập Email của bạn để chúng tôi cung cấp thông tin nhanh nhất cho bạn về những sản phẩm mới!!</p>
                      <form action method="POST">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Nhập email của bạn.." name="email" />
                          <button type="submit" className="btn btn-primary send pull-right">Gửi</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* END FOOTER */}
        {/* BACK TO TOP */}
        <div className="back-to-top">▲</div>
        {/* END BACK TO TOP */}
        {/* REGISTER DIALOG */}
        <div className="modal fade" id="modal-register" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-color">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 className="modal-title text-center">Đăng ký</h3>
              </div>
              <form action="#" method="POST">
                <div className="modal-body">
                  <div className="form-group">
                    <input type="text" className="form-control" name="fullname" placeholder="Họ và tên" required oninvalid="this.setCustomValidity('Vui lòng nhập tên của bạn')" oninput="this.setCustomValidity('')" />
                  </div>
                  <div className="form-group">
                    <input type="tel" className="form-control" name="mobile" placeholder="Số điện thoại" required pattern="[0][0-9]{9,}" oninvalid="this.setCustomValidity('Vui lòng nhập số điện thoại bắt đầu bằng số 0 và ít nhất 9 con số theo sau')" oninput="this.setCustomValidity('')" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="Email" required oninvalid="this.setCustomValidity('Vui lòng nhập email')" oninput="this.setCustomValidity('')" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="Mật khẩu" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" oninvalid="this.setCustomValidity('Vui lòng nhập ít nhất 8 ký tự: số, chữ hoa, chữ thường')" oninput="this.setCustomValidity('')" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" name="re-password" placeholder="Nhập lại mật khẩu" required autoComplete="off" autoSave="off" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" oninvalid="this.setCustomValidity('Vui lòng nhập ít nhất 8 ký tự: số, chữ hoa, chữ thường')" oninput="this.setCustomValidity('')" />
                  </div>
                  <div className="form-group g-recaptcha" data-sitekey="6Lcj07oUAAAAALAHcj_WdDa7Vykqzui3mSA5SIoe" />
                  <input type="hidden" name="reference" defaultValue />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Hủy</button>
                  <button type="submit" className="btn btn-primary">Đăng ký</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* END REGISTER DIALOG */}

        {/* LOGIN DIALOG */}
        <LoginForm />
        {/* END LOGIN DIALOG */}

        &lt; !--FORTGOT PASSWORD DIALOG-- &gt;
        <div className="modal fade" id="modal-forgot-password" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-color">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 className="modal-title text-center">Quên mật khẩu</h3>
              </div>
              <form action="#" method="POST" role="form">
                <div className="modal-body">
                  <div className="form-group">
                    <input name="email" type="email" className="form-control" placeholder="Email" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <input type="hidden" name="reference" defaultValue />
                  <button type="submit" className="btn btn-primary">GỬI</button><br />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* END FORTGOT PASSWORD DIALOG */}

        {/* CART DIALOG */}
        <Cart />
        {/* END CART DIALOG */}

        {/* Facebook Messenger Chat */}
        {/* Load Facebook SDK for JavaScript */}
        <div id="fb-root" />
        {/* Your customer chat code */}
        <div className="fb-customerchat" attribution="setup_tool" page_id={112296576811987} logged_in_greeting="Chào bạn, bạn muốn mua sản phẩm nào bên GodaShop.com" logged_out_greeting="Chào bạn, bạn muốn mua sản phẩm nào bên GodaShop.com">
        </div>
      </div>
    </>
  )
}
