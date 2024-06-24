import Navbar from "./components/Navbar.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from "./pages/shop/shop";
import { ShopContextProvider } from "./context/show-context.jsx";
import { Cart } from "./pages/cart/cart.jsx";
import Payment from "./components/Payment.jsx";
import { Dashboard } from "./pages/dashboard/dashboard.jsx";
import Budget from "./pages/Budget/budget.jsx";

function App() {
  return (
    <>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path = "/pay" element = {<Payment />} />
            <Route path = "/dashboard" element = {<Dashboard />} />
            <Route path = "/Budget" element = {<Budget />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </>
  );
}

export default App;
