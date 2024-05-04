import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

import Products from '../views/Products'
import Product from '../views/Product'
import Cart from '../views/Cart'
import Catalog from '../views/account/Catalog'
import AddProduct from '../forms/products/AddProduct'
import EditProduct from '../forms/products/EditProduct'
import Account from '../views/account/Account'
import Profile from '../views/account/Profile'
import EditUser from '../forms/users/EditUser'
import Orders from '../views/account/Orders'
import Order from '../views/account/Order'
import AddOrder from '../forms/orders/AddOrder'
import Login from '../views/login/Login'
import SignUp from '../views/login/SignUp'
import PasswordReset from '../views/login/PasswordReset'
import PasswordChangeForm from '../forms/users/PasswordChangeForm'
import PasswordResetForm from '../views/login/PasswordResetForm'
import EmailAlert from '../views/login/EmailAlert'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='product/:id' element={<Product />} />

      <Route element={<PublicRoutes />}>
        <Route path='login' element={<Login />} />
        <Route path='/login/reset' element={<PasswordReset />} />
        <Route path='/login/signup' element={<SignUp />} />
        <Route path='/login/email' element={<EmailAlert />} />
        <Route path='password/reset' element={<PasswordResetForm />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />

        <Route path='/account' element={<Account />} />
        <Route path='/account/catalog' element={<Catalog />} />
        <Route path='/account/catalog/product/:id' element={<Product />} />
        <Route path='/account/profile' element={<Profile />} />
        <Route path='/account/profile/edit' element={<EditUser />} />
        <Route path='/account/profile/password' element={<PasswordChangeForm />} />
        <Route path='/account/personalorders' element={<Orders />} />
        <Route path='/account/personalorders/:id' element={<Order />} />
        <Route path='/account/personalorders/:id/product/:id' element={<Product />} />
        <Route path='/account/customerorders/' element={<Orders />} />
        <Route path='/account/customerorders/:id' element={<Order />} />
        <Route path='/account/customerorders/:id/product/:id' element={<Product />} />

        <Route path='cart' element={<Cart />} />
        <Route path='cart/product/:id' element={<Product />} />

        <Route path='/order/add' element={<AddOrder />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
