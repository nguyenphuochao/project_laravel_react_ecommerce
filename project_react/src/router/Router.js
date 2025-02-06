import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../component/Layout'
import ProtectedRouter from './ProtectedRouter';
import LoginRouter from './LoginRouter';

// --- Admin Page ---
import Dashboard from '../page/dashboard/Dashboard'

import CategoryList from '../page/category/CategoryList'
import CategoryAdd from '../page/category/CategoryAdd'
import CategoryEdit from '../page/category/CategoryEdit'

import ProductList from '../page/product/ProductList'
import Login from '../page/auth/Login'
import ProductAdd from '../page/product/ProductAdd';
import ProductEdit from '../page/product/ProductEdit';



export default function Router() {
  return (
    <>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<LoginRouter><Login /></LoginRouter>} />

        {/* -- Layout -- */}
        <Route path="/admin" element={<Layout />} >
          {/* Dashboard */}
          <Route path="/admin" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
          
          {/* Category */}
          <Route path="/admin/category/list" element={<ProtectedRouter><CategoryList /></ProtectedRouter>} />
          <Route path="/admin/category/add" element={<ProtectedRouter><CategoryAdd /></ProtectedRouter>} />
          <Route path="/admin/category/edit/:slug" element={<ProtectedRouter><CategoryEdit /></ProtectedRouter>} />

          {/* Product */}
          <Route path="/admin/product/list" element={<ProtectedRouter><ProductList /></ProtectedRouter>} />
          <Route path="/admin/product/add" element={<ProtectedRouter><ProductAdd /></ProtectedRouter>} />
          <Route path="/admin/product/edit" element={<ProtectedRouter><ProductEdit /></ProtectedRouter>} />
          
        </Route>
        {/* -- End Layout -- */}
      </Routes>
    </>
  )
}
