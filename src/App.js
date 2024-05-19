import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/Dashboard/home.jsx";
import Customer from "./pages/Customers/Customer.jsx";
import Billing from "./pages/Billing/Billing.jsx";
import Employee from "./pages/Employees/Employee.jsx";
import Supplier from "./pages/Suppliers/Supplier.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import UpdateEmployee from "./pages/Employees/EmployeeUpdate.jsx";
import UpdateCustomer from "./pages/Customers/CustomerUpdate.jsx";
import UpdateSupplier from "./pages/Suppliers/SupplierUpdate.jsx";
import UpdateInventory from "./pages/Inventory/InventoryUpdate.jsx";
import UpdateBilling from "./pages/Billing/BillingUpdate.jsx";
import Calendar from "./pages/Calendar/index.jsx";
import "./style/dark.scss";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register.jsx";
import Status from "./pages/AdminStatus/AdminStatus.jsx"

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={<Home />} />
            <Route path="billing" element={<Billing />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="supplier" element={<Supplier />} />
            <Route path="customer" element={<Customer />} />
            <Route path="employee" element={<Employee />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="status" element={<Status/>} />
            <Route path="employee/:id" element={<UpdateEmployee />} />
            <Route path="customer/:id" element={<UpdateCustomer />} />
            <Route path="supplier/:id" element={<UpdateSupplier />} />
            <Route path="inventory/:id" element={<UpdateInventory />} />
            <Route path="billing/:id" element={<UpdateBilling />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
