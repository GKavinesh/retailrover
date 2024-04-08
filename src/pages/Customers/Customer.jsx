import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Customer.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerTable = ({ customers, onDelete, onUpdate }) => {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
              <button onClick={() => onDelete(customer.id)}>Delete</button>
              <button onClick={() => onUpdate(customer)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CustomerForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <button type="button" class="btn btn-primary">Add</button>
    </form>
  );
};

const CustomerUI = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddCustomer = async (customer) => {
    try {
      const response = await axios.post('http://localhost:8080/api/customers', customer);
      setCustomers([...customers, response.data]);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${customerId}`);
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleUpdateCustomer = async (updatedCustomer) => {
    try {
      await axios.put(`http://localhost:8080/api/customers/${updatedCustomer.id}`, updatedCustomer);
      const updatedCustomers = customers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
    <div>
      <h2>Customer Details</h2>
      <CustomerForm onSubmit={handleAddCustomer} />
      <CustomerTable
        customers={customers}
        onDelete={handleDeleteCustomer}
        onUpdate={handleUpdateCustomer}
      />
    </div>
    </div>
    </div>
      );
};

export default CustomerUI;

