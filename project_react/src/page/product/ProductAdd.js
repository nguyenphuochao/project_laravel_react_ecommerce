import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { axiosAuthInstance } from '../../helper/util';
import { toast } from 'react-toastify';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


export default function ProductAdd() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null); // Xử lý hiển thị ảnh preview
    const [file, setFile] = useState(null);

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            barcode: '',
            sku: '',
            name: '',
            price: '',
            inventory_qty: '',
            category_id: '',
            brand_id: '',
            description: '',
            featured: 0,
            featured_image: null
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            barcode: Yup.number()
                .required('Vui lòng nhập barcode'),
            sku: Yup.string()
                .required('Vui lòng nhập SKU'),
            name: Yup.string()
                .required('Vui lòng nhập tên sản phẩm'),
            price: Yup.number()
                .required('Vui lòng nhập giá bán lẻ'),
            inventory_qty: Yup.number()
                .required('Vui lòng nhập số lượng tồn'),
            category_id: Yup.number()
                .required('Vui lòng chọn danh mục'),
            brand_id: Yup.number()
                .required('Vui lòng chọn thương hiệu'),
            description: Yup.string()
                .required('Vui lòng nhập mô tả')

        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async (values, { setErrors }) => {
            try {
                const formData = new FormData();
                formData.append('barcode', values.barcode);
                formData.append('sku', values.sku);
                formData.append('name', values.name);
                formData.append('price', values.price);
                formData.append('inventory_qty', values.inventory_qty);
                formData.append('category_id', values.category_id);
                formData.append('brand_id', values.brand_id);
                formData.append('featured', values.featured.length === 0 ? 0 : 1);
                formData.append('description', values.description);
                formData.append('featured_image', file);

                const response = await axiosAuthInstance().post('/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                toast.success(`Đã thêm mới ${response.data.name}`);
                navigate('/admin/product/list');
            } catch (error) {
                setErrors(error.response.data.errors); // gán error vào formik
            }
        }
    });

    // Xử lí khi chọn file
    const handleFileChange = (e) => {
        const file = e.currentTarget.files[0];
        setFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // Hiển thị preview ảnh
        }
    }


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
                    <form method="post" action="#" encType="multipart/form-data" onSubmit={formik.handleSubmit}>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="barcode">Barcode </label>
                            <div className="col-md-9 col-lg-6">
                                <input name="barcode" id="barcode" type="text" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.barcode} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.barcode && formik.errors.barcode ?
                                        <div className='text-danger'>{formik.errors.barcode}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="sku">SKU </label>
                            <div className="col-md-9 col-lg-6">
                                <input name="sku" id="sku" type="text" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.sku} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.sku && formik.errors.sku ?
                                        <div className='text-danger'>{formik.errors.sku}</div> : null
                                }
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="name">Tên sản phẩm </label>
                            <div className="col-md-9 col-lg-6">
                                <input name="name" id="name" type="text" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.name && formik.errors.name ?
                                        <div className='text-danger'>{formik.errors.name}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="price">Giá bán lẻ </label>
                            <div className="col-md-9 col-lg-6">
                                <input name="price" id="price" type="number" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.price} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.price && formik.errors.price ?
                                        <div className='text-danger'>{formik.errors.price}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="inventory_qty">Lượng tồn</label>
                            <div className="col-md-9 col-lg-6">
                                <input name="inventory_qty" id="inventory_qty" type="number" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.inventory_qty} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.inventory_qty && formik.errors.inventory_qty ?
                                        <div className='text-danger'>{formik.errors.inventory_qty}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="category_id">Danh mục </label>
                            <div className="col-md-9 col-lg-6">
                                <select name="category_id" id="category_id" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.category_id} onBlur={formik.handleBlur}>
                                    <option value="">Chọn danh mục</option>
                                    <option value="1">Kem Chống Nắng</option>
                                    <option value="2">Kem Dưỡng Da</option>
                                    <option value="3">Kem Trị Mụn</option>
                                    <option value="4">Kem Trị Thâm Nám</option>
                                    <option value="5">Sữa Rửa Mặt</option>
                                    <option value="6">Sữa Tắm</option>
                                </select>
                                {
                                    formik.touched.category_id && formik.errors.category_id ?
                                        <div className='text-danger'>{formik.errors.category_id}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="brand_id">Thương hiệu </label>
                            <div className="col-md-9 col-lg-6">
                                <select name="brand_id" id="brand_id" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.brand_id} onBlur={formik.handleBlur}>
                                    <option value="">Chọn thương hiệu</option>
                                    <option value="1">Kem Chống Nắng</option>
                                    <option value="2">Kem Dưỡng Da</option>
                                    <option value="3">Kem Trị Mụn</option>
                                </select>
                                {
                                    formik.touched.brand_id && formik.errors.brand_id ?
                                        <div className='text-danger'>{formik.errors.brand_id}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label">Nổi bật</label>
                            <div className="col-md-9 col-lg-6">
                                <input type="checkbox" name="featured" value={1}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.brand && formik.errors.brand ?
                                        <div className='text-danger'>{formik.errors.brand}</div> : null
                                }
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="featured_image">Hình ảnh </label>
                            <div className="col-md-9 col-lg-6">
                                <input type="file" name="featured_image" id="featured_image"
                                    onChange={handleFileChange} onBlur={formik.handleBlur} accept="image/*" />
                                {
                                    formik.touched.featured_image && formik.errors.featured_image ?
                                        <div className='text-danger'>{formik.errors.featured_image}</div> : null
                                }

                                {/* Hiển thị ảnh preview */}
                                {preview && (
                                    <div className="mt-3">
                                        <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "10px" }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="description">Mô tả</label>
                            <div className="col-md-12">
                                <textarea name="description" id="description" rows={10} cols={80}
                                    onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.description && formik.errors.description ?
                                        <div className='text-danger'>{formik.errors.description}</div> : null
                                }
                            </div>
                        </div>



                        <div className="form-action">
                            <input type="submit" className="btn btn-primary btn-sm" value="Lưu" name="save" />
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}
