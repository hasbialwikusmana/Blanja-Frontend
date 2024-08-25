import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ProductDetail from "./pages/Products/ProductDetail";
import Category from "./pages/Category/Category";
import Checkout from "./pages/Checkout/Checkout";
import MyBag from "./pages/Checkout/MyBag";
import Profile from "./pages/Profile/Profile";
import ShippingAddress from "./pages/Address/ShippingAddress";
import MyOrder from "./pages/Orders/MyOrder";
import MyOrderSeller from "./pages/Orders/MyOrderSeller";
import ProfileSeller from "./pages/Profile/ProfileSeller";
import MyProduct from "./pages/Products/MyProduct";
import SellingProduct from "./pages/Products/SellingProduct";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./services/ProtectRoute";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const userLoggedIn = localStorage.getItem("token");
    setIsLoggedIn(!!userLoggedIn);
  };

  useState(() => {
    checkLoginStatus();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Home */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <PrivateRoute>
                  <Navbar />
                  <Home />
                  <Footer />
                </PrivateRoute>
              ) : (
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              )
            }
          />

          {/* Category */}
          <Route
            path="/products/category/:id"
            element={
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            }
          />

          {/* Checkout */}
          <Route
            path="/mybag"
            element={
              <PrivateRoute>
                <MyBag />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          {/* Product */}
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />

          {/* Profile Customer */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/shipping-address"
            element={
              <PrivateRoute>
                <ShippingAddress />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-order"
            element={
              <PrivateRoute>
                <MyOrder />
              </PrivateRoute>
            }
          />

          {/* Profile Seller */}

          <Route
            path="/profile-seller"
            element={
              <PrivateRoute>
                <ProfileSeller />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-products"
            element={
              <PrivateRoute>
                <MyProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/selling-products"
            element={
              <PrivateRoute>
                <SellingProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrderSeller />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
