import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { axiosNonAuthInstance, updateParam } from '../../helper/util';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';
import Aside from '../../component/site/Aside';
import Loading from '../../component/site/Loading';
import ProductList from '../../component/site/ProductList';
import Pagination from '../../component/site/Pagination';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, totalPage: 0 });

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const sortBy = searchParams.get('sort-by') || '';
    const priceRange = searchParams.get('price-range') || '';
    const categoryId = searchParams.get('category-id') || 'all';

    // Lấy danh sách sản phẩm
    const getProducts = async () => {
        try {
            const response = await axiosNonAuthInstance().get(`/site/products?page=${page}&sort-by=${sortBy}&price-range=${priceRange}&category-id=${categoryId}`);
            setProducts(response.data.items);
            setPagination(response.data.pagination);
            setIsLoaded(true)
        } catch (error) {
            toast.error(error.message)
            setIsLoaded(true)
        }
    }

    // Click phân trang
    const handlePage = (e, page) => {
        e.preventDefault();
        setPage(page);
        const newParams = { page: page };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Click tiến tới 1 trang
    const handleNextPage = (e, page) => {
        e.preventDefault();
        if(page === pagination.totalPage) return;
        setPage(page + 1);
        const newParams = { page: page + 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Click lùi 1 trang
    const handlePrePage = (e, page) => {
        e.preventDefault();
        if(page === 1) return;
        setPage(page - 1);
        const newParams = { page: page - 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Sắp sếp theo
    const handleSortBy = (value) => {
        setPage(1);
        const newParams = { page: 1, "sort-by": value };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Tìm theo khoảng giá
    const handlePriceRange = (value) => {
        setPage(1);
        const newParams = { page: 1, "price-range": value };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Tìm theo danh mục
    const handleCategoryId = (e, category_id) => {
        e.preventDefault();
        setPage(1);
        const newParams = { page: 1, "category-id": category_id };
        updateParam(searchParams, setSearchParams, newParams);
    }

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, [page, sortBy, categoryId, priceRange])


    return (
        <>
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>

            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><Link to="/" target="_self">Trang chủ</Link></li>
                                <li><span> / </span></li>
                                <li className="active"><span>Tất cả sản phẩm</span></li>
                            </ol>
                        </div>
                        <div className="col-xs-3 hidden-lg hidden-md">
                            <Link className="hidden-lg pull-right btn-aside-mobile" to="#">Bộ lọc <i className="fa fa-angle-double-right" /></Link>
                        </div>
                        <div className="clearfix" />

                        <Aside handleCategoryId={handleCategoryId} handlePriceRange={handlePriceRange}
                            priceRange={priceRange} categoryId={categoryId} />

                        <div className="col-md-9 products">
                            <div className="row equal">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Tất cả sản phẩm</h4>
                                </div>
                                <div className="col-xs-6 sort-by">
                                    <div className="pull-right">
                                        <label className="left hidden-xs" htmlFor="sort-select">Sắp xếp: </label>
                                        <select id="sort-select" onChange={(e) => handleSortBy(e.target.value)}>
                                            <option value="default">Mặc định</option>
                                            <option selected={`${sortBy === "price-asc" ? "selected" : ""}`} value="price-asc">Giá tăng dần</option>
                                            <option selected={`${sortBy === "price-desc" ? "selected" : ""}`} value="price-desc">Giá giảm dần</option>
                                            <option selected={`${sortBy === "alpha-asc" ? "selected" : ""}`} value="alpha-asc">Từ A-Z</option>
                                            <option selected={`${sortBy === "alpha-desc" ? "selected" : ""}`} value="alpha-desc">Từ Z-A</option>
                                            <option selected={`${sortBy === "created-asc" ? "selected" : ""}`} value="created-asc">Cũ đến mới</option>
                                            <option selected={`${sortBy === "created-desc" ? "selected" : ""}`} value="created-desc">Mới đến cũ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="clearfix" />

                                {/* Danh sách sản phẩm */}
                                {
                                    !isLoaded ? <Loading /> :
                                        products.map((item, index) =>
                                            <div key={index} className="col-xs-6 col-sm-4">
                                                <ProductList product={item} />
                                            </div>
                                        )
                                }

                            </div>

                            {/* Paging */}
                            <Pagination pagination={pagination} handlePage={handlePage} handlePrePage={handlePrePage} handleNextPage={handleNextPage} />
                            {/* End paging */}

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
