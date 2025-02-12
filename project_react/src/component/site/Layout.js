import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../site/Header'
import Footer from '../site/Footer'
import { Helmet } from 'react-helmet'


export function Layout() {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/x-icon" href="/site/images/logo.jpg" />
        <link rel="stylesheet" href="/site/vendor/fontawesome-free-5.11.2-web/css/all.min.css" />
        <link rel="stylesheet" href="site/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="site/vendor/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" />
        <link rel="stylesheet" href="site/vendor/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/site/vendor/star-rating/css/star-rating.min.css" />
        <link rel="stylesheet" href="/site/css/style.css" />
      </Helmet>

      <Header />

      <Outlet />

      <Footer />
    </>
  )
}
