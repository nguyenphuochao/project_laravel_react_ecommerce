import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../component/Layout'


// --- Admin Page ---
import Dashboard from '../page/Dashboard'

import CategoryList from '../page/category/CategoryList'
import CategoryAdd from '../page/category/CategoryAdd'
import CategoryEdit from '../page/category/CategoryEdit'

import ProductList from '../page/product/ProductList'

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Layout />} >
          {/* Dashboard */}
          <Route path="/admin" element={<Dashboard />} />

          {/* Category */}
          <Route path="/admin/category/list" element={<CategoryList />} />
          <Route path="/admin/category/add" element={<CategoryAdd />} />
          <Route path="/admin/category/edit/:slug" element={<CategoryEdit />} />

          {/* product */}
          <Route path="/admin/product/list" element={<ProductList />} />
        </Route>
      </Routes>
    </>
  )
}
