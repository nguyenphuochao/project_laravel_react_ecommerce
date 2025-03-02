import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginRouterAdmin from './LoginRouterAdmin';
import LoginRouterSide from './LoginRouterSide';
import ProtectedRouter from './ProtectedRouter';

// admin
import Layout from '../component/admin/Layout'

import Login from '../page/admin/auth/Login';

import Dashboard from '../page/admin/dashboard/Dashboard';

import CategoryList from '../page/admin/category/CategoryList';
import CategoryAdd from '../page/admin/category/CategoryAdd';
import CategoryEdit from '../page/admin/category/CategoryEdit';

import ProductList from '../page/admin/product/ProductList';
import ProductAdd from '../page/admin/product/ProductAdd';
import ProductEdit from '../page/admin/product/ProductEdit';


// site
import { Layout as LayoutSite } from '../component/site/Layout';

import HomePage from '../page/site/HomePage'
import Product from '../page/site/Product';
import ReturnPolicy from '../page/site/ReturnPolicy';
import PaymentPolicy from '../page/site/PaymentPolicy';
import DeliveryPolicy from '../page/site/DeliveryPolicy';
import Contact from '../page/site/Contact';
import ProductDetail from '../page/site/ProductDetail';
import Checkout from '../page/site/Checkout';
import MyOrder from '../page/site/MyOrder';
import OrderDetail from '../page/site/OrderDetail';
import Account from '../page/site/Account';


export default function Router() {
  return (
    <>
      <Routes>

        {/* ADMIN */}

        {/* Login */}
        <Route path="/login" element={<ProtectedRouter><Login /></ProtectedRouter>} />

        <Route path="/admin" element={<Layout />} >

          {/* Dashboard */}
          <Route path="/admin" element={<LoginRouterAdmin><Dashboard /></LoginRouterAdmin>} />

          {/* Category */}
          <Route path="/admin/category/list" element={<LoginRouterAdmin><CategoryList /></LoginRouterAdmin>} />
          <Route path="/admin/category/add" element={<LoginRouterAdmin><CategoryAdd /></LoginRouterAdmin>} />
          <Route path="/admin/category/edit/:slug" element={<LoginRouterAdmin><CategoryEdit /></LoginRouterAdmin>} />

          {/* Product */}
          <Route path="/admin/product/list" element={<LoginRouterAdmin><ProductList /></LoginRouterAdmin>} />
          <Route path="/admin/product/add" element={<LoginRouterAdmin><ProductAdd /></LoginRouterAdmin>} />
          <Route path="/admin/product/edit/:slug" element={<LoginRouterAdmin><ProductEdit /></LoginRouterAdmin>} />

        </Route>

        {/* END ADMIN */}


        {/* SITE */}

        <Route path="" element={<LayoutSite />}>

          {/* HomePage */}
          <Route path="/" element={<HomePage />} />
          {/* Product */}
          <Route path="/san-pham.html" element={<Product />} />
          {/* ProductDetail */}
          <Route path="/san-pham/:slug" element={<ProductDetail />} />
          {/* Return Policy */}
          <Route path="/chinh-sach-doi-tra.html" element={<ReturnPolicy />} />
          {/* PaymentPolicy */}
          <Route path="/chinh-sach-thanh-toan.html" element={<PaymentPolicy />} />
          {/* DeliveryPolicy */}
          <Route path="/chinh-sach-giao-hang.html" element={<DeliveryPolicy />} />
          {/* Contact */}
          <Route path="/lien-he.html" element={<Contact />} />
          {/* Checkout */}
          <Route path="/dat-hang.html" element={<Checkout />} />
          {/* MyOrder */}
          <Route path="/don-hang-cua-toi.html" element={<LoginRouterSide><MyOrder /></LoginRouterSide>} />
          {/* OrderDetail */}
          <Route path="/chi-tiet-don-hang/:slug.html" element={<LoginRouterSide><OrderDetail /></LoginRouterSide>} />
          {/* Account */}
          <Route path="/thong-tin-tai-khoan.html" element={<LoginRouterSide><Account /></LoginRouterSide>} />

        </Route>

        {/* END SITE */}

      </Routes>

    </>
  )
}
