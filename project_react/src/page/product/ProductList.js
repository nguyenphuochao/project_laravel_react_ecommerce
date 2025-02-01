import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductList() {
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

                    {/* Form multi search */}
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    {/* Tìm theo tên sản phẩm */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên sản phẩm</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    {/* Tìm theo tên danh mục */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên danh mục</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    {/* Tìm theo barcode */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Barcode</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    {/* Tìm theo ngày tạo */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Ngày tạo</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary btn-sm">Tìm kiếm</button>
                    </form>


                    {/* Link action */}
                    <div className="action-bar">
                        <Link to="/admin/product/add" className="btn btn-primary btn-sm mr-2">Thêm</Link>
                        <Link to="/admin/product/add" className="btn btn-danger btn-sm">Xóa</Link>
                    </div>

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
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>#25</td>
                                            <td>Kem chống nắng Beaumore - 80ml - giá sỉ​, giá tốt Kem chống nắng Beaumore - 80ml</td>
                                            <td><img src="../../images/suaTamSandrasShowerGel.jpg" /></td>
                                            <td>180,000 ₫</td>
                                            <td>10%</td>
                                            <td>166,000 ₫</td>
                                            <td>50</td>
                                            <td>4,8</td>
                                            <td />
                                            <td>Kem Trị Thâm Nám </td>
                                            <td>2017-10-16 15:22:00</td>
                                            <td><a href="../../pages/comment/list.html">Đánh giá</a></td>
                                            <td><a href="../../pages/image/list.html">Hình ảnh</a></td>
                                            <td><input type="button" onclick="Edit('25');" defaultValue="Sửa" className="btn btn-warning btn-sm" /></td>
                                            <td><input type="button" onclick="Delete('25');" defaultValue="Xóa" className="btn btn-danger btn-sm" /></td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>#26</td>
                                            <td>Kem trị mụn nghệ Nhật Beaumore Pure Turmeric Cream (Mới)- 20g </td>
                                            <td><img src="../../images/kemTrangDaLinhChiDongTrungHaThao.jpg" /></td>
                                            <td>239,000 ₫</td>
                                            <td>5%</td>
                                            <td>227,000 ₫</td>
                                            <td>20</td>
                                            <td>4,7</td>
                                            <td>Có</td>
                                            <td>Kem Trị Mụn</td>
                                            <td>2017-10-16 14:22:00</td>
                                            <td><a href="../../pages/comment/list.html">Đánh giá</a></td>
                                            <td><a href="../../pages/image/list.html">Hình ảnh</a></td>
                                            <td><input type="button" onclick="Edit('26');" defaultValue="Sửa" className="btn btn-warning btn-sm" /></td>
                                            <td><input type="button" onclick="Delete('26');" defaultValue="Xóa" className="btn btn-danger btn-sm" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
