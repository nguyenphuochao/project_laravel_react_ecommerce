import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { axiosAuthInstance } from '../../helper/util';

export default function CategoryAdd() {
    const navigate = useNavigate();

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            name: '',
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập tên danh mục')
        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async values => {
            try {
                const response = await axiosAuthInstance().post('/categories', values);
                toast.success(`Đã thêm mới ${response.data.name}`);
                navigate('/admin/category/list');
            } catch (error) {
                toast.error(error.response.data.message);
                // console.log(error.response.data.message);
            }
        }
    });

    return (
        <>
            <div id="content-wrapper">
                <div className="container-fluid">
                    {/* Breadcrumbs*/}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="#">Quản lý</Link>
                        </li>
                        <li className="breadcrumb-item active">Danh mục</li>
                    </ol>
                    {/* /form */}
                    <form method="post" action="#" onSubmit={formik.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-md-12 control-label" htmlFor="name">Tên</label>
                            <div className="col-md-9 col-lg-6">
                                <input name="name" type="text" className="form-control"
                                    onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {
                                    formik.touched.name && formik.errors.name ?
                                        <div className='text-danger'>{formik.errors.name}</div> : null
                                }
                            </div>
                        </div>
                        <div className="form-action">
                            <button type="submit" className="btn btn-primary btn-sm">Lưu</button>
                        </div>
                    </form>
                    {/* /form */}
                </div>
            </div>

        </>
    )
}
