import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function EditProductForm({ product, handleUpdate }) {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            barcode: product?.barcode,
            sku: product?.sku,
            name: product?.name,
            price: product?.price,
            inventory_qty: product?.inventory_qty,
            category_id: product?.category_id,
            brand_id: product?.brand_id,
            description: product?.description,
            featured: product?.featured,
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
        onSubmit: async (values) => {
            try {
                handleUpdate(values, file);
            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    const handleFileChange = (e) => {
        const file = e.currentTarget.files[0];
        setFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // Hiển thị preview ảnh
        }
    }

    return (
        <>
            <form action="#" encType="multipart/form-data" onSubmit={formik.handleSubmit}>

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
                    <label className="col-md-12 control-label">Ngày tạo </label>
                    <div className="col-md-9 col-lg-6">
                        {product.created_date}
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-md-12 control-label">Nổi bật</label>
                    <div className="col-md-9 col-lg-6">
                        <input type="checkbox" name="featured" defaultChecked={formik.values.featured}
                            onChange={formik.handleChange} value={formik.values.featured} onBlur={formik.handleBlur} />
                        {
                            formik.touched.brand && formik.errors.brand ?
                                <div className='text-danger'>{formik.errors.brand}</div> : null
                        }
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                        <img src={preview ? preview : product.featured_image} width={200} alt="" />
                    </div>

                    <div className="col-md-9 col-lg-6 mt-4">
                        <input type="file" name="featured_image" id="featured_image"
                            onChange={handleFileChange} onBlur={formik.handleBlur} accept="image/*" />
                        {
                            formik.touched.featured_image && formik.errors.featured_image ?
                                <div className='text-danger'>{formik.errors.featured_image}</div> : null
                        }
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

                <div className="form-action mb-5">
                    <input type="submit" className="btn btn-primary btn-sm mr-2" value="Cập nhật" name="update" />
                    <Link to="/admin/product/list" className="btn btn-warning btn-sm">Quay về</Link>
                </div>
            </form>
        </>
    )
}
