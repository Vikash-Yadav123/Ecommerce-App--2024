import AdminRoute from "./components/routes/AdminRoute.js";
import PrivateRoutes from "./components/routes/PrivateRoutes.js";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/User/UserDashboard";
import Profile from "./pages/User/Profile";
import UserOrder from "./pages/User/UserOrder";
import AdminOrders from "./pages/Admin/AdminOrders.js";
import Product from "./pages/Admin/Product.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import Users from './pages/Admin/User.js';
import CreateProduct from './pages/Admin/CreateProduct.js'
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import SearchProduct from "./pages/SearchProduct.js";
import DetailsProduct from "./pages/DetailsProduct.js";
import CartPage from "./pages/CartPage.js";
import Categoryes from "./pages/Categoryes.js";
import CategoryProduct from "./pages/CategoryProduct.js";

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/details/:slug" element={<DetailsProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categoryes" element={<Categoryes />} />
        <Route path="/categorye/:slug" element={< CategoryProduct />} />
        <Route path="/*" element={<PageNotFound />} />

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={< CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/update/:slug" element={<UpdateProduct />} />

        </Route>

        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<UserOrder />} />
        </Route>

      </Routes>


    </>
  );
}

export default App;
