import { Routes, Route } from "react-router";
// Public Pages
import HomePage from "../pages/Home/HomePage";
import ProductList from "../pages/Products/ProductList";
import WomenPage from "../pages/Products/WomenPage";
import MenPage from "../pages/Products/MenPage";
import KidsPage from "../pages/Products/KidsPage";
import FAQsPage from "../pages/FAQs/FAQsPage";
import CartPage from "../pages/Cart/CartPage";

// Auth Pages
import LoginPage from "../pages/User/LoginPage";
import RegisterPage from "../pages/User/RegisterPage";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetPassword from "../pages/User/ResetPassword";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Routes */}
      </Routes>
    </>
  );
};

export default AppRoutes;
