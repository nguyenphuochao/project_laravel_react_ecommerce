import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Loading from '../../../component/admin/Loading';
import { toast } from 'react-toastify';
import Pagination from '../../../component/admin/Pagination';
import { axiosAuthInstance, updateParam } from '../../../helper/util';
import Search from '../../../component/admin/Search';
import ShowQty from '../../../component/admin/ShowQty';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPage: 0 });
    const [totalItem, setTotalItem] = useState(0);
    const [checkBoxItem, setCheckBoxItem] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams(); // trạng thái lưu searchParams
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [perPage, setPerPage] = useState(searchParams.get('perPage') || 5);

    const [isLoaded, setIsLoaded] = useState(false);

    // Lấy danh sách danh mục
    const getCategories = async () => {
        try {
            const response = await axiosAuthInstance().get(`/categories?page=${page}&search=${search}&perPage=${perPage}`);
            setCategories(response.data.items);
            setPagination(response.data.pagination);
            setTotalItem(response.data.totalItem);
            setPerPage(response.data.perPage);
            setIsLoaded(true);
        } catch (error) {
            setIsLoaded(true);
        }
    }

    // Hàm click phân trang
    const handlePage = (e, page) => {
        e.preventDefault();
        setPage(page);
        const newParams = { page: page };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Hàm tìm kiếm
    const handleSearch = (e, search) => {
        e.preventDefault();
        setSearch(search);
        setPage(1);
        const newParams = { search: search, page: 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Hàm lùi 1 trang
    const handlePreviousPage = (e, page) => {
        e.preventDefault();
        setPage(page - 1);
        const newParams = { page: page - 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // Hàm tiến 1 trang
    const handleNextPage = (e, page) => {
        e.preventDefault();
        setPage(page + 1);
        const newParams = { page: page + 1 };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // hiển thị số lượng mục
    const showQtyItem = (e) => {
        const perPage = e.target.value;
        setPerPage(perPage);
        setPage(1);
        const newParams = { page: 1, perPage: perPage };
        updateParam(searchParams, setSearchParams, newParams);
    }

    // chọn những cái checkbox
    const handleCheckBox = (e, id) => {
        if (e.target.checked) {
            setCheckBoxItem([...checkBoxItem, id]); // push tất cả id checked vào state
        } else {
            setCheckBoxItem(checkBoxItem.filter(item => item !== id)); // Loại bỏ ID khỏi danh sách
        }
    }

    // hàm xóa nhiều items
    const handleDeleteAll = async (e) => {
        e.preventDefault();
        if (checkBoxItem.length === 0) {
            toast.error('Bạn chưa chọn');
            return;
        }

        try {
            await axiosAuthInstance().post('/categories/deleteAll', { ids: checkBoxItem });
            setCheckBoxItem([]);
            toast.success('Đã xóa tất cả danh mục');
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }


    // hàm xóa danh mục theo id
    const handleDelete = async (id) => {
        try {
            if (window.confirm('Bạn chắc xóa chứ?')) {
                await axiosAuthInstance().delete(`/categories/${id}}`);
                toast.success(`Đã xóa danh mục`);
                getCategories();
            }

        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line
    }, [page, search, perPage])

    return (
        <>
            <div id="content-wrapper">
                <div className="container-fluid">
                    {/* Breadcrumbs*/}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="#">Quản lý</Link>
                        </li>
                        <li className="breadcrumb-item active">Danh mục</li>
                    </ol>

                    {/* Link action */}
                    <div className="action-bar">
                        <Link to="/admin/category/add" className="btn btn-primary btn-sm mr-2">Thêm</Link>
                        <Link onClick={(e) => handleDeleteAll(e)} to="#" className="btn btn-danger btn-sm">Xóa</Link>
                    </div>

                    {/* action show and search data */}
                    <div className="d-flex justify-content-between">
                        <ShowQty perPage={perPage} showQtyItem={showQtyItem} />

                        <Search handleSearch={handleSearch} search={search} />
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>Tên</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !isLoaded ? <Loading /> :
                                                categories.map((category, index) =>
                                                    <tr key={index}>
                                                        <td><input type="checkbox" onChange={(e) => handleCheckBox(e, category.id)} /></td>
                                                        <td>{category.name}</td>
                                                        <td><Link className="btn btn-warning btn-sm" to={`/admin/category/edit/${category.id}`}>Sửa</Link></td>
                                                        <td><Link onClick={() => handleDelete(category.id)} className="btn btn-danger btn-sm" to="#">Xóa</Link></td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>

                                <div>Số lượng : {totalItem}</div>

                                {/* Phân trang */}
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
