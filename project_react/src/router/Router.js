import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../component/Layout'


// --- Admin Page ---
import Dashboard from '../page/dashboard/Dashboard'

import CategoryList from '../page/category/CategoryList'
import CategoryAdd from '../page/category/CategoryAdd'
import CategoryEdit from '../page/category/CategoryEdit'

import ProductList from '../page/product/ProductList'
import Login from '../page/auth/Login'


export default function Router() {
  return (
    <>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* -- Layout -- */}
        <Route path="/admin" element={<Layout />} >
          {/* Dashboard */}
          <Route path="/admin" element={<Dashboard />} />
          
          {/* Category */}
          <Route path="/admin/category/list" element={<CategoryList />} />
          <Route path="/admin/category/add" element={<CategoryAdd />} />
          <Route path="/admin/category/edit/:slug" element={<CategoryEdit />} />

          {/* Product */}
          <Route path="/admin/product/list" element={<ProductList />} />
        </Route>
        {/* -- End Layout -- */}
      </Routes>
    </>
  )
}
