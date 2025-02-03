import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Loading from '../../component/Loading';
import { updateParam } from '../../helper/util';
import SearchProductForm from '../../component/SearchProductForm';
import ShowQty from '../../component/ShowQty';
import Pagination from '../../component/Pagination';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPage: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams(); // trạng thái lưu searchParams
    const [searchProductName, setSearchProductName] = useState(searchParams.get('search_product_name') || '');
    const [searchCategoryName, setSearchCategoryName] = useState(searchParams.get('search_category_name') || '');
    const [searchProductBarcode, setSearchProductBarcode] = useState(searchParams.get('search_product_barcode') || '');
    const [searchProductCreatedDateFrom, setSearchProductCreatedDateFrom] = useState(searchParams.get('search_product_created_date_from') || '');
    const [searchProductCreatedDateTo, setSearchProductCreatedDateTo] = useState(searchParams.get('search_product_created_date_to') || '');
    const [perPage, setPerPage] = useState(searchParams.get('per_page') || 5);
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

    //  Lấy danh sách sản phẩm
    const getProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/products?search_product_name=${searchProductName}&search_category_name=${searchCategoryName}&search_product_barcode=${searchProductBarcode}&search_product_created_date_from=${searchProductCreatedDateFrom}&search_product_created_date_to=${searchProductCreatedDateTo}&per_page=${perPage}&page=${page}`);
            setProducts(response.data.items);
            setPerPage(response.data.perPage)
            setPagination(response.data.pagination);
            setIsLoaded(true);
        } catch (error) {
            setIsLoaded(true);
        }
    }

    // Tìm kiếm sản phẩm
    const handleSearch = (e, searchProductName, searchCategoryName, searchProductBarcode, searchProductCreatedDateFrom, searchProductCreatedDateTo) => {
        e.preventDefault();
        setSearchProductName(searchProductName);
        setSearchCategoryName(searchCategoryName);
        setSearchProductBarcode(searchProductBarcode);
        setSearchProductCreatedDateFrom(searchProductCreatedDateFrom);
        setSearchProductCreatedDateTo(searchProductCreatedDateTo);


        const newParams =
        {
            search_product_name: searchProductName,
            search_category_name: searchCategoryName,
            search_product_barcode: searchProductBarcode,
            search_product_created_date_from: searchProductCreatedDateFrom,
            search_product_created_date_to: searchProductCreatedDateTo
        };

        updateParam(searchParams, setSearchParams, newParams);
    }

    // Hiển thị số lượng sản phẩm
    const showQtyItem = (e) => {
        const perPage = e.target.value;
        setPerPage(perPage);
        setPage(1);
        const newParams = { page: 1, per_page: perPage };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Phân trang
    const handlePage = (e, page) => {
        e.preventDefault();
        setPage(page);
        const newParams = { page: page };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Phân trang click tới
    const handleNextPage = (e, page) => {
        e.preventDefault();
        setPage(page + 1);
        const newParams = { page: page + 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Phân trang click lùi
    const handlePreviousPage = (e, page) => {
        e.preventDefault();
        setPage(page - 1);
        const newParams = { page: page - 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [
        searchProductName,
        searchCategoryName,
        searchProductBarcode,
        searchProductCreatedDateFrom,
        searchProductCreatedDateTo,
        perPage,
        page])


    return (
        <>
            <div id="content-wrapper">
                <div className="container-fluid">
                    {/* Breadcrumbs*/}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="#">Quản lý</Link>
                        </li>
                        <li className="breadcrumb-item active">Sản phẩm</li>
                    </ol>

                    {/* Search Form */}
                    <SearchProductForm handleSearch={handleSearch} searchProductName={searchProductName}
                        searchCategoryName={searchCategoryName} searchProductBarcode={searchProductBarcode}
                        searchProductCreatedDateFrom={searchProductCreatedDateFrom} searchProductCreatedDateTo={searchProductCreatedDateTo}/>


                    {/* Link action */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <ShowQty perPage={perPage} showQtyItem={showQtyItem} />
                        <div className="action-bar">
                            <Link to="/admin/product/add" className="btn btn-primary btn-sm mr-2">Thêm</Link>
                            <Link to="/admin/product/add" className="btn btn-danger btn-sm">Xóa</Link>
                        </div>
                    </div>

                    {/* Show table data */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" onclick="checkAll(this)" /></th>
                                            <th>Mã</th>
                                            <th style={{ width: 50 }}>Tên </th>
                                            <th>Hình ảnh</th>
                                            <th>Giá bán lẻ</th>
                                            <th>% giảm giá</th>
                                            <th>Giá bán thực tế</th>
                                            <th>Lượng tồn</th>
                                            <th>Đánh giá</th>
                                            <th>Nội bật</th>
                                            <th>Danh mục</th>
                                            <th>Ngày tạo</th>
                                            <th />
                                            <th />
                                            <th />
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            !isLoaded ? <Loading /> :
                                                products.map((product, index) =>
                                                    <tr key={index}>
                                                        <td><input type="checkbox" /></td>
                                                        <td>#{product.barcode}</td>
                                                        <td>{product.product_name}</td>
                                                        <td><img src={product.image} alt={product.product_name} /></td>
                                                        <td>{product.price} ₫</td>
                                                        <td>{product.discount_percentage} %</td>
                                                        <td>{product.sale_price} ₫</td>
                                                        <td>{product.inventory_qty}</td>
                                                        <td>{product.star}</td>
                                                        <td>{product.featured != null ? "Có" : ""}</td>
                                                        <td>{product.category_name}</td>
                                                        <td>{product.created_date}</td>
                                                        <td><a href="../../pages/comment/list.html">Đánh giá</a></td>
                                                        <td><a href="../../pages/image/list.html">Hình ảnh</a></td>
                                                        <td><input type="button" onclick="Edit('25');" defaultValue="Sửa" className="btn btn-warning btn-sm" /></td>
                                                        <td><input type="button" onclick="Delete('25');" defaultValue="Xóa" className="btn btn-danger btn-sm" /></td>
                                                    </tr>
                                                )
                                        }

                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <Pagination pagination={pagination} handlePage={handlePage}
                                    handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
