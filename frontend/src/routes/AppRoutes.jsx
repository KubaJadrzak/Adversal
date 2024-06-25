import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

import Products from '../views/products/Products'
import ProductDetails from '../views/products/ProductDetails'
import AddProduct from '../forms/products/AddProduct'
import EditProduct from '../forms/products/EditProduct'
import Account from '../views/account/Account'
import Login from '../views/login/Login'
import SignUp from '../views/login/SignUp'
import PasswordResetRequest from '../views/login/PasswordResetRequest'
import PasswordReset from '../views/login/PasswordReset'
import PasswordResetEmail from '../views/login/PasswordResetEmail'
import Favorites from '../views/account/Favorites'
import SellerAccount from '../views/seller/SellerAccount'
import AddReview from '../forms/reviews/AddReview'
import EditReview from '../forms/reviews/EditReview'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='product/:id' element={<ProductDetails />} />
      <Route path='seller/:id' element={<SellerAccount />} />

      <Route element={<PublicRoutes />}>
        <Route path='login' element={<Login />} />
        <Route path='/login/reset' element={<PasswordResetRequest />} />
        <Route path='/login/signup' element={<SignUp />} />
        <Route path='/login/email' element={<PasswordResetEmail />} />
        <Route path='password/reset' element={<PasswordReset />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/:productId/edit' element={<EditProduct />} />

        <Route path='seller/:sellerId/review/add' element={<AddReview />} />
        <Route path='review/:reviewId/edit' element={<EditReview />} />

        <Route path='/account' element={<Account />} />
        <Route path='/favorites' element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
