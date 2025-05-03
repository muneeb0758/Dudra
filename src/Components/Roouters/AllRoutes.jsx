import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../Admin/Admin';
import Latest from '../Admin/Latest';
import AdminLogin from '../Auth/AdminLogin';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

import BathBeauty from '../Pages/All_Products_Pages/Bath&Beauty';
import Brands from '../Pages/All_Products_Pages/Brands';
import BuildingRoute from '../Pages/All_Products_Pages/BuildingRoute';
import Checkout from '../Pages/All_Products_Pages/Checkout';
import Fragrence from '../Pages/All_Products_Pages/Fragrence';

import Holiday from '../Pages/All_Products_Pages/Holiday';
import HairPages from "../Pages/All_Products_Pages/HairPages"
import NewsTrending from '../Pages/All_Products_Pages/NewsTrending';
import Sale from '../Pages/All_Products_Pages/Sale';
import SelfCare from '../Pages/All_Products_Pages/Self-Care';

import Breakfast from '../Pages/All_Products_Pages/breakfast';

import SkinPage from '../Pages/All_Products_Pages/SkinPage';
import Tools from '../Pages/All_Products_Pages/Tools';
import Cart from "../Pages/Cart";
import Home from '../Pages/Home';
import Shop from '../ProductsPage/ProductPage';
import PrivateRoute, { AdminPrivateRoute } from './PrivateRoute';
import FruitsVeg from '../Pages/All_Products_Pages/Fruitsveg';

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPrivateRoute><Admin /></AdminPrivateRoute>} />
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/skin' element={<Shop />} />
        <Route path='/bathbeauty' element={<BathBeauty />} />
        <Route path='/breakfast' element={<Breakfast />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/building' element={<BuildingRoute />} />
        <Route path='/fragrence' element={<Fragrence />} />
        <Route path='/hair' element={<HairPages />} />
        <Route path='/holiday' element={<Holiday />} />
        <Route path='/fruits' element={<FruitsVeg />} />
        <Route path='/news' element={<NewsTrending />} />
        <Route path='/sale' element={<Sale />} />
        <Route path='/selfcare' element={<SelfCare />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/skincare' element={<SkinPage />} />
        <Route path="/latest" element={<Latest />} />

      </Routes>
    </div>
  );
}

export default AllRoutes;