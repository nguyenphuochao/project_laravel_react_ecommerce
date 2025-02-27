import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosNonAuthInstance } from '../../helper/util';
import { toast } from 'react-toastify';

export default function LoginForm() {
    const dispatch = useDispatch();

    const popup_type = useSelector(state => state.PopupReducer.popup_type);

    // đóng popup
    const handleClosePopup = () => {
        const action = { type: 'POPUP_CLOSE' }
        dispatch(action);
    }

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            email: '',
            password: '',
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .required('Vui lòng nhập password'),
        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async values => {
            // Đóng popup
            handleClosePopup();
            try {
                // call API để login
                const response = await axiosNonAuthInstance().post('/site/login', values);
                const data = response.data;
                toast.success('Login thành công');

                // dispatch action bao gồm access token và thông tin user lên store
                const action = {
                    type: "LOGIN_SUCCESS",
                    payload: {
                        access_token: data.token,
                        loggedUser: data.customer
                    }
                }

                dispatch(action);
            } catch (error) {
                toast.error(error?.response?.data || error.message);
            }
        }
    });

    return (
        <>
            <div className={`modal ${popup_type === "POPUP_LOGIN" ? "show" : "fade"}`} id="modal-login" role="dialog" style={{ display: `${popup_type === "POPUP_LOGIN" ? "block" : "none"}` }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button onClick={() => handleClosePopup()} type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h3 className="modal-title text-center">Đăng nhập</h3>
                            {/* Google login */}
                            <br />
                            <div className="text-center">
                                <Link className="btn btn-primary google-login" style={{ marginRight: "5px" }} to="#"><i className="fab fa-google" /> Đăng nhập bằng Google</Link>
                                {/* Facebook login */}
                                <Link className="btn btn-primary facebook-login" to="#"><i className="fab fa-facebook-f" /> Đăng nhập bằng Facebook</Link>
                            </div>
                        </div>

                        <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                            <div className="modal-body">

                                <div className="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email"
                                        onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.email && formik.errors.email ?
                                            <div className='text-danger'>{formik.errors.email}</div> : null
                                    }
                                </div>

                                <div className="form-group">
                                    <input type="password" name="password" className="form-control" placeholder="Mật khẩu"
                                        onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.password && formik.errors.password ?
                                            <div className='text-danger'>{formik.errors.password}</div> : null
                                    }
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Đăng Nhập</button><br />
                                <div className="text-left">
                                    <Link to="#" className="btn-register">Bạn chưa là thành viên? Đăng kí ngay!</Link>
                                    <Link to="#" className="btn-forgot-password">Quên Mật Khẩu?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
