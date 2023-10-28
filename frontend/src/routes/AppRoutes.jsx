import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductsList from '../views/ProductsList'

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<ProductsList/>} />
        </Routes>
    );
}

export default AppRoutes