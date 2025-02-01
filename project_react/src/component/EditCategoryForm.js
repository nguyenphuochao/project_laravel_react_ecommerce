import { useFormik } from 'formik';
import React from 'react'
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export default function EditCategoryForm({ category, handleUpdate }) {

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            name: category?.name || '',
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập tên danh mục')
        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async values => {
            try {
                handleUpdate(values);
            } catch (error) {
                toast.error(error.message);
            }
        }
    });


    return (
        <>
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
                    <input type="submit" className="btn btn-primary btn-sm" value="Cập nhật" name="update" />
                </div>
            </form>
        </>
    )
}
