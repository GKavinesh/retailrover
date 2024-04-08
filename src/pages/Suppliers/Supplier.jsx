import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Supplier.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/navbar/Navbar";

const SupplierTable = ({ suppliers, onDelete, onUpdate }) => {
  return (
    <table className="supplier-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier, index) => (
          <tr key={index}>
            <td>{supplier.name}</td>
            <td>{supplier.email}</td>
            <td>{supplier.phone}</td>
            <td>
              <button onClick={() => onDelete(supplier.id)}>Delete</button>
              <button onClick={() => onUpdate(supplier.id)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SupplierForm = ({ onSubmit }) => {
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
      <button type="Submit" class="btn btn-primary">Add</button>
    </form>
  );
};

const SupplierUI = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleAddSupplier = async (supplier) => {
    try {
      const response = await axios.post('http://localhost:8080/api/suppliers', supplier);
      setSuppliers([...suppliers, response.data]);
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/suppliers/${id}`);
      const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
      setSuppliers(updatedSuppliers);
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleUpdateSupplier = (id) => {
    // You can implement update functionality here
    console.log("Update supplier with id", id);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
    <div>
      <h2>Supplier Management</h2>
      <SupplierForm onSubmit={handleAddSupplier} />
      <SupplierTable
        suppliers={suppliers}
        onDelete={handleDeleteSupplier}
        onUpdate={handleUpdateSupplier}
      />
    </div>
    </div>
    </div>
  );
};

export default SupplierUI;

