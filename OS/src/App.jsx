import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Shop from "./pages/Shop";


const ProtectedVendorRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch(err) {}

  const role = (user?.role || "").trim().toUpperCase();
  const isVendor = /VENDEUR|VENDOR|PARTNER|VENDEURE/i.test(role);

  if (!token || !user || !isVendor) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch(err) {}

  if (!token || !user || user.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/vendor/dashboard" element={
          <ProtectedVendorRoute>
            <VendorDashboard />
          </ProtectedVendorRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}