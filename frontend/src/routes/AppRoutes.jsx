import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductsList from '../views/ProductsList'
import Product from '../views/Product'

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="product/:id" element={<Product/>}/>
        </Routes>
    );
}

export default AppRoutes