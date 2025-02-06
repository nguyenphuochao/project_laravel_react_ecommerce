import { Link } from 'ckeditor5'
import React from 'react'

export default function ProductEdit() {
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

                    {/* /form */}
                    <form method="post" action encType="multipart/form-data">
                        <div className="row form-group">
                            <label className="col-md-12 control-label" htmlFor="name">Tên </label>
                            <div className="col-md-9 col-lg-6">
                                <input type="hidden" name="id" defaultValue={25} className="form-control" />
                                <input name="name" id="name" type="text" defaultValue="Kem trị mụn nghệ Nhật Beaumore Pure Turmeric Cream (Mới)- 20g " className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="retail-price">Giá bán lẻ </label>
                            <div className="col-md-9 col-lg-6">
                                <input name="retail-price" id="retail-price" type="text" defaultValue={239000} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="inventory-number">Lượng tồn</label>
                            <div className="col-md-9 col-lg-6">
                                <input name="inventory-number" id="inventory-number" type="text" defaultValue={20} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="category">Danh mục</label>
                            <div className="col-md-9 col-lg-6">
                                <select name="category" id="category" className="form-control">
                                    <option value="Kem Chống Nắng">Kem Chống Nắng</option>
                                    <option value="Kem Dưỡng Da">Kem Dưỡng Da</option>
                                    <option selected value="Kem Trị Mụn">Kem Trị Mụn</option>
                                    <option value="Kem Trị Thâm Nám">Kem Trị Thâm Nám</option>
                                    <option value="Sữa Rửa Mặt">Sữa Rửa Mặt</option>
                                    <option value="Sữa Tắm">Sữa Tắm</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-12 control-label">Ngày tạo </label>
                            <div className="col-md-9 col-lg-6">
                                2017-10-16 14:22:00
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-12 control-label">Nổi bật</label>
                            <div className="col-md-9 col-lg-6">
                                <input type="checkbox" defaultValue={1} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-12">
                                <img src="../../images/bodyLotionMakeup.jpg" alt />
                            </div>
                            <div className="col-md-9 col-lg-6">
                                <input type="file" name="image" id="image" />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="description">Mô tả</label>
                            <div className="col-md-12">
                                <textarea name="description" id="description" rows={10} cols={80} defaultValue={"                                        <p>Giới Thiệu Dòng Sản Phẩm Son Môi WODWOD\n\n                                            Son môi WODWOD gồm 5 màu để bạn lưa chon.</p>\n\n                                        <p>Là một trong những mẫu son môi chất lượng an toàn với khả năng dưỡng môi kết hợp với khả năng trang điểm đôi môi mang tới cho bạn gái một đôi môi xinh tươi đáng yêu hơn bao giờ hết\n                                        </p>\n                                        <p>Không chỉ giúp cho khách hàng của mình có được một đôi môi đẹp mà son môi WODWOD còn cung cấp cho khách hàng nhiều màu môi để lựa chọn phù hợp với tùy từng sở thích riêng của mỗi người.</p>\n                                    "} />
                            </div>
                        </div>

                        <div className="form-action">
                            <input type="submit" className="btn btn-primary btn-sm" value="Cập nhật" name="update" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
