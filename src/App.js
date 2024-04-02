import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/Dashboard/home.jsx";
import Customer from "./pages/Customers/Customer.jsx";
import Billing from "./pages/Billing/Billing.jsx";
import Employee from "./pages/Employees/Employee.jsx";
import Supplier from "./pages/Suppliers/Supplier.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="billing" element={<Billing />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="supplier" element={<Supplier />} />
            <Route path="customer" element={<Customer />} />
            <Route path="employee" element={<Employee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
