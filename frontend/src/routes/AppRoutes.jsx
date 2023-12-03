import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductsList from '../views/ProductsList'
import Product from '../views/Product'
import Cart from "../views/Cart";
import Catalog from "../views/Catalog";
import AddProduct from '../forms/products/AddProduct'
import EditProduct from '../forms/products/EditProduct'

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<ProductsList/>} />

            <Route path="product/:id" element={<Product/>}/>
            <Route path="/product/add" element={<AddProduct/>}/>
            <Route path="/product/:id/edit" element={<EditProduct/>}/>
            <Route path="cart" element={<Cart/>}/>

            <Route path="cart/product/:id" element={<Product/>}/>
            <Route path="catalog" element={<Catalog/>}/>
        </Routes>
    )
}

export default AppRoutes