import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import BathBeauty from '../Pages/All_Products_Pages/Bath&Beauty';
import Brands from '../Pages/All_Products_Pages/Brands';
import BuildingRoute from '../Pages/All_Products_Pages/BuildingRoute';
import Checkout from '../Pages/All_Products_Pages/Checkout';
import Packaging from '../Pages/All_Products_Pages/Packaging';
import Holiday from '../Pages/All_Products_Pages/Holiday';
import HairPages from "../Pages/All_Products_Pages/HairPages";
import NewsTrending from '../Pages/All_Products_Pages/NewsTrending';
import Sale from '../Pages/All_Products_Pages/Sale';
import Spices from '../Pages/All_Products_Pages/Spices';
import ProductPage from '../ProductsPage/ProductPage';
import Breakfast from '../Pages/All_Products_Pages/breakfast';
import ProductDetail from '../ProductsPage/ProductDetail';
import SkinPage from '../Pages/All_Products_Pages/SkinPage';
import Tools from '../Pages/All_Products_Pages/Tools';
import Cart from "../Pages/Cart";
import Home from '../Pages/Home';
import Shop from '../ProductsPage/ProductPage';
import PrivateRoute from './PrivateRoute';
import FruitsVeg from '../Pages/All_Products_Pages/Fruitsveg';

const AllRoutes = ({ searchTerm }) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/skin" element={<Shop />} />
        <Route path="/bathbeauty" element={<BathBeauty />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/building" element={<BuildingRoute />} />
        <Route path="/packaging" element={<Packaging />} />
        <Route path="/hair" element={<HairPages />} />
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/fruits" element={<FruitsVeg />} />
        <Route path="/news" element={<NewsTrending />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/spices" element={<Spices />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/skincare" element={<SkinPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;