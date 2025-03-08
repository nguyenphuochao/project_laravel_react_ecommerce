import React from 'react';
import AsideOrder from '../../component/site/AsideOrder';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { axiosAuthInstance } from '../../helper/util';

export default function Account() {
    const dispatch = useDispatch();

    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            fullname: loggedUser?.name || '',
            mobile: loggedUser?.mobile || '',
            current_password: '',
            new_password: '',
            confirm_password: ''
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('Vui lòng nhập họ tên'),
            mobile: Yup.string()
                .required('Vui lòng nhập số điện thoại'),
        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async (values, { setErrors }) => {
            try {

                // console.log(values);

                const response = await axiosAuthInstance().put('/site/customer/update', values);
                const name = response.data.name;
                toast.success(`Cập nhật thành công ${name}`);

                // thực hiện dispatch vào store
                const action = {
                    type : "UPDATE_LOGGED_USER",
                    payload : {
                        loggedUser : response.data
                    }
                };

                dispatch(action);

            } catch (error) {
                toast.error(error.message);
                setErrors(error.response.data.errors); // gán error vào formik
            }
        }
    });

    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tài khoản</span></li>
                            </ol>
                        </div>
                        <div className="clearfix" />

                        <AsideOrder />

                        <div className="col-md-9 account">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Thông tin tài khoản</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-6">
                                    <form className="info-account" onSubmit={formik.handleSubmit}>

                                        <div className="form-group">
                                            <input type="text" className="form-control" name="fullname" placeholder="Họ và tên"
                                                onChange={formik.handleChange} value={formik.values.fullname} onBlur={formik.handleBlur} />
                                            {
                                                formik.touched.fullname && formik.errors.fullname ?
                                                    <div className='text-danger'>{formik.errors.fullname}</div> : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <input type="tel" className="form-control" name="mobile" placeholder="Số điện thoại"
                                                onChange={formik.handleChange} value={formik.values.mobile} onBlur={formik.handleBlur} />
                                            {
                                                formik.touched.mobile && formik.errors.mobile ?
                                                    <div className='text-danger'>{formik.errors.mobile}</div> : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <input type="password" className="form-control" name="current_password" placeholder="Mật khẩu hiện tại"
                                                onChange={formik.handleChange} value={formik.values.current_password} onBlur={formik.handleBlur} />
                                            {
                                                formik.touched.current_password && formik.errors.current_password ?
                                                    <div className='text-danger'>{formik.errors.current_password}</div> : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <input type="password" className="form-control" name="new_password" placeholder="Nhập mật khẩu mới"
                                                onChange={formik.handleChange} value={formik.values.new_password} onBlur={formik.handleBlur} />
                                            {
                                                formik.touched.new_password && formik.errors.new_password ?
                                                    <div className='text-danger'>{formik.errors.new_password}</div> : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <input type="password" className="form-control" name="confirm_password" placeholder="Nhập lại mật khẩu mới"
                                                onChange={formik.handleChange} value={formik.values.confirm_password} onBlur={formik.handleBlur} />
                                            {
                                                formik.touched.confirm_password && formik.errors.confirm_password ?
                                                    <div className='text-danger'>{formik.errors.confirm_password}</div> : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary pull-right">Cập nhật</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
