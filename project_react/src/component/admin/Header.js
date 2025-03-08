import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

export default function Header() {
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                <a className="navbar-brand mr-1" href="index.html">Mỹ Phẩm YouT</a>
                <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
                    <i className="fas fa-bars" />
                </button>
                {/* Navbar Search */}
                {/* Navbar */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item no-arrow text-white">
                        <span>Chào {loggedUser?.name}</span> |
                        <Link className="text-white nounderline" to="#" data-toggle="modal" data-target="#logoutModal">Thoát</Link>
                    </li>
                </ul>
            </nav>

            <ToastContainer />
        </>
    )
}
