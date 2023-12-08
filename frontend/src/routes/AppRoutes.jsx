import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductsList from '../views/ProductsList'
import Product from '../views/Product'
import Cart from "../views/Cart";
import Catalog from "../views/account/Catalog";
import AddProduct from '../forms/products/AddProduct'
import EditProduct from '../forms/products/EditProduct'
import Account from '../views/account/Account'
import Profile from '../views/account/Profile'
import EditUser from '../forms/users/EditUser'
import PersonalOrders from "../views/account/PersonalOrders";
import PersonalOrder from "../views/account/PersonalOrder";
import AddOrder from "../forms/orders/AddOrder";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<ProductsList/>} />

            <Route path="product/:id" element={<Product/>}/>
            <Route path="/product/add" element={<AddProduct/>}/>
            <Route path="/product/:id/edit" element={<EditProduct/>}/>

            <Route path="/account" element={<Account/>}/>
            <Route path="/account/catalog" element={<Catalog/>}/>
            <Route path="/account/catalog/product/:id" element={<Product/>}/>
            <Route path="/account/profile" element={<Profile/>}/>
            <Route path="/account/profile/edit" element={<EditUser/>}/>
            <Route path="/account/personalorders" element={<PersonalOrders/>}/>
            <Route path="/account/personalorders/:id" element={<PersonalOrder/>}/>

            <Route path="cart" element={<Cart/>}/>
            <Route path="cart/product/:id" element={<Product/>}/>

            <Route path="/order/add" element={<AddOrder/>}/>

        </Routes>
    )
}

export default AppRoutes