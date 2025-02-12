import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { axiosNonAuthInstance } from '../../helper/util';
import Loading from '../../component/site/Loading';
import ProductList from '../../component/site/ProductList';

export default function HomePage() {
  const [productFeatured, setProductFeatured] = useState([]);
  const [productLatest, setProductLatest] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getProductFeatured = async () => {
    const response = await axiosNonAuthInstance().get('/site/products?featured=1');
    setIsLoaded(true);
    setProductFeatured(response.data);
  }

  const getProductLatest = async () => {
    const response = await axiosNonAuthInstance().get('/site/products?latest=1');
    setIsLoaded(true);
    setProductLatest(response.data);
  }

  const getProductByCat = async () => {
    const response = await axiosNonAuthInstance().get('/site/products?by_category=1');
    setIsLoaded(true);
    setProductByCategory(response.data);
  }

  useEffect(() => {
    getProductFeatured();
    getProductLatest();
    getProductByCat();
  }, [])


  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>

      {/* SLIDESHOW */}
      <div className="slideshow container-fluid">
        <div className="row">
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to={0} className="active" />
              <li data-target="#myCarousel" data-slide-to={1} className />
              <li data-target="#myCarousel" data-slide-to={2} className />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner">
              <div className="item active">
                <img src="../site/images/slider1.jpg" alt="slider 1" />
              </div>
              <div className="item">
                <img src="../site/images/slider_2.jpg" alt="slider 2" />
              </div>
              <div className="item">
                <img src="../site/images/slider_3.jpg" alt="slider 3" />
              </div>
            </div>
            {/* Left and right controls */}
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      {/* END SLIDESHOW */}

      {/* SERVICES */}
      <div className="top-services container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 item item-1">
            <div className="item-inner">
              <Link className="item-inline" title="7 NGÀY ĐỔI TRẢ" to="#">
                <span className="title-sv">7 NGÀY ĐỔI TRẢ</span>
                <span>Chăm sóc khách hàng cực tốt</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 item item-2">
            <div className="item-inner">
              <Link className="item-inline" title="MIỄN PHÍ SHIP" to="#">
                <span className="title-sv">MIỄN PHÍ SHIP</span>
                <span>Với dịch vụ giao hàng tiết kiệm</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 item item-3">
            <div className="item-inner">
              <Link className="item-inline" title="BÁN BUÔN NHƯ BÁN SỈ" to="#">
                <span className="title-sv">BÁN BUÔN NHƯ BÁN SỈ</span>
                <span>Giá hợp lý nhất quả đất</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 item item-4">
            <div className="item-inner">
              <Link className="item-inline" title="CHẤT LƯỢNG HÀNG ĐẦU" to="#">
                <span className="title-sv">CHẤT LƯỢNG HÀNG ĐẦU</span>
                <span>Chăm sóc bạn như người thân </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* END SERVICES */}

      {/* MAIN */}
      <main id="maincontent" className="page-main">
        <div className="container">

          {/* Sản phẩm nổi bật */}
          <div className="row equal">
            <div className="col-xs-12">
              <h4 className="home-title">Sản phẩm nổi bật</h4>
            </div>
            {
              !isLoaded ? <Loading /> :
                productFeatured.map((item, index) =>
                  <div key={index} className="col-xs-6 col-sm-3">
                    <ProductList product={item} />
                  </div>
                )
            }
          </div>

          {/* Sản phẩm mới nhất */}
          <div className="row equal">
            <div className="col-xs-12">
              <h4 className="home-title">Sản phẩm mới nhất</h4>
            </div>
            {
              !isLoaded ? <Loading /> :
                productLatest.map((item, index) =>
                  <div key={index} className="col-xs-6 col-sm-3">
                    <ProductList product={item} />
                  </div>
                )
            }
          </div>

          {/* Sản phẩm theo danh mục */}
          {
            !isLoaded ? <Loading /> :
              productByCategory.map((item, index_cat) =>
                <div key={index_cat} className="row equal">
                  <div className="col-xs-12">
                    <h4 className="home-title">{item.cate_name}</h4>
                  </div>
                  {
                    item.products.map((product, index_product) =>
                      <div key={index_product} className="col-xs-6 col-sm-3">
                          <ProductList product={product} />
                      </div>
                    )
                  }
                </div>
              )
          }
        </div>
      </main>
      {/* END MAIN */}
    </>
  )
}
