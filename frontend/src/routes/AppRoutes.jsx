import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductsList from '../views/ProductsList'
import Product from '../views/Product'
import Cart from "../views/Cart";
import Catalog from "../views/Catalog";
import NewProductForm from "../views/NewProductForm";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="product/:id" element={<Product/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="catalog" element={<Catalog/>}/>
            <Route path="newproduct" element={<NewProductForm/>}/>
        </Routes>
    )
}

export default AppRoutes