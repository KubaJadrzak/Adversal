import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

import Products from '../views/products/Products'
import ProductDetails from '../views/products/ProductDetails'
import Catalog from '../views/account/Catalog'
import AddProduct from '../forms/products/AddProduct'
import EditProduct from '../forms/products/EditProduct'
import Account from '../views/account/Account'
import Profile from '../views/account/Profile'
import EditUser from '../forms/users/EditUser'
import Login from '../views/login/Login'
import SignUp from '../views/login/SignUp'
import PasswordResetRequest from '../views/login/PasswordResetRequest'
import PasswordReset from '../views/login/PasswordReset'
import PasswordResetEmail from '../views/login/PasswordResetEmail'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='product/:id' element={<ProductDetails />} />

      <Route element={<PublicRoutes />}>
        <Route path='login' element={<Login />} />
        <Route path='/login/reset' element={<PasswordResetRequest />} />
        <Route path='/login/signup' element={<SignUp />} />
        <Route path='/login/email' element={<PasswordResetEmail />} />
        <Route path='password/reset' element={<PasswordReset />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />

        <Route path='/account' element={<Account />} />
        <Route path='/account/catalog' element={<Catalog />} />
        <Route path='/account/catalog/product/:id' element={<ProductDetails />} />
        <Route path='/account/profile' element={<Profile />} />
        <Route path='/account/profile/edit' element={<EditUser />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
