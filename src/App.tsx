import React from "react";
import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./view/Register";
import Login from "./view/Login";
import Dashboard from "./view/Dashboard";
import AuthProvider from "../src/context/AuthContext";
import Home from "./view/Home";
import ProtectedRoute from "./view/ProtectedRoute";
import Shop from "./view/Shop";
import Cart from "./view/Cart";
import ShopProvider from "./context/ShopContext";

function App() {
  const getLoggedIn = () => {
    const token = localStorage.getItem("LoggedIn") || null;
    if (token == null) {
      return false;
    }
    return true;
  };
  return (
    <div className="App">
      <AuthProvider>
        <ShopProvider>
          <Routes>
            <Route path="/shop/*" element={<Shop />} />
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={ProtectedRoute({ children: <Dashboard /> })}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </ShopProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
