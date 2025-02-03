import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer className="sticky-footer">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright © Thầy Lộc 2017</span>
                    </div>
                </div>
            </footer>

            {/* Logout Modal*/}
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bạn muốn thoát?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                            <Link className="btn btn-primary" to="/login">Thoát</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
