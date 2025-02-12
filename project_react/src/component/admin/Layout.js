import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Helmet } from 'react-helmet';

export default function Layout() {
  return (
    <>
      <Helmet>
        {/* Create favicon */}
        <link rel="shortcut icon" type="image/x-icon" href="/admin/images/logo.jpg" />
        {/* Custom fonts for this template*/}
        <link href="/admin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        {/* Page level plugin CSS*/}
        <link href="/admin/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet" />
        {/* Custom styles for this template*/}
        <link href="/admin/css/sb-admin.css" rel="stylesheet" />
        <link href="/admin/css/admin.css" rel="stylesheet" />

        {/* Bootstrap core JavaScript */}
        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
        <script src="/admin/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        {/* Core plugin JavaScript */}
        <script src="/admin/vendor/jquery-easing/jquery.easing.min.js"></script>
        {/* Custom scripts for all pages */}
        <script src="/admin/js/sb-admin.min.js"></script>
        {/* Demo scripts for this page */}
        <script src="/admin/js/admin.js"></script>
      </Helmet>

      <Header />

      <div id="wrapper">
        <Sidebar />

        <Outlet />

        <Footer />
      </div>
    </>
  )
}
