import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/public/Home';
import Products from '../pages/public/Products';
import ProductDetail from '../pages/public/ProductDetail';
import About from '../pages/public/About';
import NotFound from '../pages/public/NotFound';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import Profile from '../pages/customer/Profile';
import MyOrders from '../pages/customer/MyOrders';
import OrderDetail from '../pages/customer/OrderDetail';

import Dashboard from '../pages/admin/Dashboard';
import ProductsManage from '../pages/admin/ProductsManage';
import ProductEdit from '../pages/admin/ProductEdit';
import CategoriesManage from '../pages/admin/CategoriesManage';
import OrdersManage from '../pages/admin/OrdersManage';
import OrderDetailAdmin from '../pages/admin/OrderDetailAdmin';
import UsersManage from '../pages/admin/UsersManage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />

        {/* CUSTOMER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/:id" element={<OrderDetail />} />
        </Route>
      </Route>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* ADMIN */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsManage />} />
          <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/categories" element={<CategoriesManage />} />
          <Route path="/admin/orders" element={<OrdersManage />} />
          <Route path="/admin/orders/:id" element={<OrderDetailAdmin />} />
          <Route path="/admin/users" element={<UsersManage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}