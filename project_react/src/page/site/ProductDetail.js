import React from 'react'
import { Link } from 'react-router-dom'
import Aside from '../../component/site/Aside'

export default function ProductDetail() {
  return (
    <>
      <main id="maincontent" className="page-main">
        <div className="container">
          <div className="row">
            <div className="col-xs-9">
              <ol className="breadcrumb">
                <li><Link to="/" target="_self">Trang chủ</Link></li>
                <li><span>/</span></li>
                <li className="active"><span>Kem Dưỡng Da</span></li>
              </ol>
            </div>
            <div className="col-xs-3 hidden-lg hidden-md">
              <Link className="hidden-lg pull-right btn-aside-mobile" to="#">Bộ lọc <i className="fa fa-angle-double-right" /></Link>
            </div>
            <div className="clearfix" />

            <Aside />

            <div className="col-md-9 product-detail">
              <div className="row product-info">
                <div className="col-md-6">
                  <img data-zoom-image="../images/kemLamSangVungDaBikini.jpg" className="img-responsive thumbnail main-image-thumbnail" src="../images/kemLamSangVungDaBikini.jpg" alt="" />
                  <div className="product-detail-carousel-slider">
                    <div className="owl-carousel owl-theme">
                      <div className="item thumbnail"><img src="../images/kemLamSangVungDaBikini.jpg" alt /></div>
                      <div className="item thumbnail"><img src="../images/beaumoreContourEyeCream.jpg" alt /></div>
                      <div className="item thumbnail"><img src="../images/kemChongNangBeaumore4in1.jpg" alt /></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="product-name">Kem làm sáng vùng da bikini Beaumore- 50ml</h5>
                  <div className="brand">
                    <span>Nhãn hàng: </span> <span>REDWIN</span>
                  </div>
                  <div className="product-status">
                    <span>Trạng thái: </span>
                    <span className="label-warning">Hết hàng</span>
                  </div>
                  <div className="product-item-price">
                    <span>Giá: </span>
                    <span className="product-item-discount">849,000₫</span>
                  </div>
                </div>
              </div>
              <div className="row product-description">
                <div className="col-xs-12">
                  <div role="tabpanel">
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active">
                        <a href="#product-description" aria-controls="home" role="tab" data-toggle="tab">Mô tả</a>
                      </li>
                      <li role="presentation">
                        <a href="#product-comment" aria-controls="tab" role="tab" data-toggle="tab">Đánh giá</a>
                      </li>
                    </ul>
                    {/* Tab panes */}
                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="product-description">
                        <p>Mô tả chi tiết</p>
                        <p>– Với chiết từ lá dâu tằm, chất Arbutin trong quả dâu gấu cùng các thành phần thảo dược thiên nhiên giúp tăng cường hàng rào biểu bì, ngăn ngừa lão hóa da</p>
                        <p>– Làm da trắng sáng, giữ ẩm và tăng độ đàn hồi cho da</p>
                        <p>– Diệt khuẩn, kháng viêm, làm mịn và sáng vùng bikini</p>
                        <p>– Tăng cường hàng rào biểu bì, giữ ẩm, ngăn ngừa lão hóa da</p>
                        <p>– Tăng dộ đàn hồi cho da, mang lại vẻ sáng và mềm mại cho da</p>
                        <p>– Làm sáng da bằng cách ức chế sự hình thành của Melanin</p>
                        <p>– Chăm sóc da bị kích ứng và tấy đỏ, chống bong tróc. Giúp làm giảm các ban đỏ gây ra bởi tia UV cháy nắng.</p>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="product-comment">
                        <form className="form-comment" action method="POST" role="form">
                          <label>Đánh giá của bạn</label>
                          <div className="form-group">
                            <input type="hidden" name="product_id" defaultValue={3} />
                            <input className="rating-input" name="rating" type="text" title defaultValue={4} />
                            <input type="text" className="form-control" id name="fullname" placeholder="Tên *" required />
                            <input type="email" name="email" className="form-control" id placeholder="Email *" required />
                            <textarea name="description" id="input" className="form-control" rows={3} required placeholder="Nội dung *" defaultValue={""} />
                          </div>
                          <button type="submit" className="btn btn-primary">Gửi</button>
                        </form>
                        <div className="comment-list">
                          <hr />
                          <span className="date pull-right">2019-11-29 16:11:07</span>
                          <input className="answered-rating-input" name="rating" type="text" title defaultValue={4} readOnly />
                          <span className="by">abc</span>
                          <p>test</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row product-related equal">
                <div className="col-md-12">
                  <h4 className="text-center">Sản phẩm liên quan</h4>
                  <div className="owl-carousel owl-theme">
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/kemLuaLamDepDaBeaumore.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem lụa làm đẹp da Beaumore- 30ml">Kem lụa làm đẹp da Beaumore- 30ml</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">1,500,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={5} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/kemLamDepTucThiInstantBeauMore.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem làm đẹp tức thì  Instant Beaumore">Kem làm đẹp tức thì  Instant Beaumore</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">762,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={6} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/suaTamSandrasShowerGel.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Sữa tắm Sandras Shower Gel">Sữa tắm Sandras Shower Gel</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">180,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={7} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/suaDuongTheSandraschai88ml.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Sữa dưỡng thể Sandras chai 88ml">Sữa dưỡng thể Sandras chai 88ml</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">180,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={8} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/kemDuongTrangDaNgayVaDem.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem Dưỡng Trắng Da Ngày vs Đêm">Kem Dưỡng Trắng Da Ngày vs Đêm</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">265,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={10} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/kemNenTrangDiemDuongDaSandrasBB.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem nền trang điểm dưỡng da Sandras BB 24h- 15ml">Kem nền trang điểm dưỡng da Sandras BB 24h- 15ml</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">321,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={11} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/nhamSamSandrasBeauty20g.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem làm trắng da và mờ nếp nhăn từ Nhân sâm Sandras Beauty- 20g ">Kem làm trắng da và mờ nếp nhăn từ Nhân sâm Sandras Beauty- 20g </a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">380,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={13} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/beaumoreContourEyeCream.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem dưỡng da vùng mắt Beaumore Contour Eye Cream- 10g">Kem dưỡng da vùng mắt Beaumore Contour Eye Cream- 10g</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">300,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={14} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/kemGiaiDocToPh20ml.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem giải độc tố pH Beaumore- 20ml">Kem giải độc tố pH Beaumore- 20ml</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">239,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={18} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item thumbnail">
                      <div className="product-container">
                        <div className="image">
                          <img className="img-responsive" src="../images/kemTrangDaLinhChiDongTrungHaThao.jpg" alt />
                        </div>
                        <div className="product-meta">
                          <h5 className="name">
                            <a className="product-name" href="chi-tiet-san-pham.html" title="Kem làm trắng da từ Linh Chi và Đông Trùng Hạ Thảo Sandras Beauty-15g">Kem làm trắng da từ Linh Chi và Đông Trùng Hạ Thảo Sandras Beauty-15g</a>
                          </h5>
                          <div className="product-item-price">
                            <span className="product-item-discount">905,000₫</span>
                          </div>
                        </div>
                        <div className="button-product-action clearfix">
                          <div className="cart icon">
                            <a className="btn btn-outline-inverse buy" product-id={20} href="javascript:void(0)" title="Thêm vào giỏ">
                              Thêm vào giỏ <i className="fa fa-shopping-cart" />
                            </a>
                          </div>
                          <div className="quickview icon">
                            <a className="btn btn-outline-inverse" href="chi-tiet-san-pham.html" title="Xem nhanh">
                              Xem chi tiết <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
