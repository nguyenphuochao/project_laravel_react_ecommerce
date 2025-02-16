import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Aside from '../../component/site/Aside'
import { axiosNonAuthInstance, formatMoney } from '../../helper/util';
import { toast } from 'react-toastify';
import ProductSlider from '../../component/site/ProductSlider';
import Loading from '../../component/site/Loading';
import DOMPurify from 'dompurify';
import ProductRelate from '../../component/site/ProductRelate';

export default function ProductDetail() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { slug } = useParams();
  const slugParts = slug.split(".html");
  const leftPart = slugParts[0];
  const parts = leftPart.split("-");
  const productId = parts.pop();

  // Lấy ra chi tiết sản phẩm
  const getproduct = async () => {
    try {
      const response = await axiosNonAuthInstance().get(`/site/products/${productId}`);
      setProduct(response.data);
      setIsLoaded(true);
      //console.log(response.data);
    } catch (error) {
      toast.error(error.message);
      setIsLoaded(true);
    }
  }

  // Lọc theo danh mục
  const handleCategoryId = (e, id) => {
    e.preventDefault();
    navigate(`/san-pham.html?page=1&category-id=${id}`)
  }

  // Lọc theo giá
  const handlePriceRange = (value) => {
    navigate(`/san-pham.html?page=1&price-range=${value}`)
  }

  useEffect(() => {
    getproduct()
  }, [])


  return (
    <>
      <main id="maincontent" className="page-main">
        <div className="container">
          <div className="row">
            <div className="col-xs-9">
              <ol className="breadcrumb">
                <li>
                  <Link to="/" target="_self">Trang chủ</Link>
                </li>
                <li><span>/</span></li>
                <li className="active"><span>Kem Dưỡng Da</span></li>
              </ol>
            </div>
            <div className="col-xs-3 hidden-lg hidden-md">
              <Link className="hidden-lg pull-right btn-aside-mobile" to="#">Bộ lọc <i
                className="fa fa-angle-double-right" /></Link>
            </div>
            <div className="clearfix" />

            <Aside handleCategoryId={handleCategoryId} handlePriceRange={handlePriceRange} />

            {
              !isLoaded ? <div className="col-md-9 product-detail"><Loading /></div> :
                <div className="col-md-9 product-detail">
                  <div className="row product-info">
                    {/* Product Slider */}
                    <div className="col-md-6">
                      <ProductSlider product={product} />
                    </div>

                    {/* Product detail */}
                    <div className="col-md-6">
                      <h5 className="product-name">{product.product_name}</h5>

                      <div className="barcode">
                        <span>Barcode: </span> <span>{product.barcode}</span>
                      </div>

                      <div className="brand">
                        <span>Nhãn hàng: </span> <span>{product.category_name}</span>
                      </div>

                      <div className="product-status">
                        <span>Trạng thái: </span>
                        {
                          product.inventory_qty > 0 ? <span className="label-success">Còn hàng</span> : <span className="label-warning">Hết hàng</span>
                        }
                      </div>

                      <div className="product-item-price">
                        <span>Giá: </span>
                        <span className="product-item-discount">{formatMoney(product.sale_price)}₫</span>
                      </div>

                      <div classname="input-group">
                        <input type="number" className="product-quantity form-control" defaultValue={1} min={1} />
                        <Link to="#" className="buy-in-detail btn btn-success cart-add-button">
                          <i className="fa fa-shopping-cart" />Thêm vào giỏ hàng
                        </Link>
                      </div>

                    </div>
                  </div>

                  {/* Product Descripion */}
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
                          <div role="tabpanel" className="tab-pane active" id="product-description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}>

                          </div>

                          <div role="tabpanel" className="tab-pane" id="product-comment">
                            <form className="form-comment" action method="POST" role="form">
                              <label>Đánh giá của bạn</label>
                              <div className="form-group">
                                <input type="hidden" name="product_id" defaultValue={3} />
                                <input className="rating-input" name="rating" type="text" title defaultValue={4} />
                                <input type="text" className="form-control" id name="fullname" placeholder="Tên *" required />
                                <input type="email" name="email" className="form-control" id placeholder="Email *" required />
                                <textarea name="description" id="input" className="form-control" rows={3} required
                                  placeholder="Nội dung *" defaultValue={""} />
                              </div>
                              <button type="submit" className="btn btn-primary">Gửi</button>
                            </form>
                            <div className="comment-list">
                              <hr />
                              <span className="date pull-right">2019-11-29 16:11:07</span>
                              <input className="answered-rating-input" name="rating" type="text" title defaultValue={4}
                                readOnly />
                              <span className="by">abc</span>
                              <p>test</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Related */}
                  <div className="row product-related equal">
                    <div className="col-md-12">
                      <h4 className="text-center">Sản phẩm liên quan</h4>
                      <ProductRelate relatedProducts={product.relatedProducts} />
                    </div>
                  </div>
                </div>
            }

          </div>
        </div>
      </main>
    </>
  )
}