import React, { useState } from 'react';
import "./Supplier.scss";

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
              <button onClick={() => onDelete(index)}>Delete</button>
              <button onClick={() => onUpdate(index)}>Update</button>
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
      <button type="submit">Add Supplier</button>
    </form>
  );
};

const SupplierUI = () => {
  const [suppliers, setSuppliers] = useState([]);

  const handleAddSupplier = (supplier) => {
    setSuppliers([...suppliers, supplier]);
  };

  const handleDeleteSupplier = (index) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers.splice(index, 1);
    setSuppliers(updatedSuppliers);
  };

  const handleUpdateSupplier = (index) => {
    // You can implement update functionality here
    console.log("Update supplier with index", index);
  };

  return (
    <div>
      <h2>Supplier Management</h2>
      <SupplierForm onSubmit={handleAddSupplier} />
      <SupplierTable
        suppliers={suppliers}
        onDelete={handleDeleteSupplier}
        onUpdate={handleUpdateSupplier}
      />
    </div>
  );
};

export default SupplierUI;


