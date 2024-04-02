import React, { useState } from 'react';
import "./Billing.scss";

const ProductTable = ({ products, onDelete, onUpdate }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.unitPrice}</td>
            <td>{product.quantity * product.unitPrice}</td>
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

const BillingForm = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, name, quantity, unitPrice });
    setId('');
    setName('');
    setQuantity('');
    setUnitPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product ID" value={id} onChange={(e) => setId(e.target.value)} required />
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <input type="number" placeholder="Unit Price" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

const BillingUI = () => {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = (index) => {
    // You can implement update functionality here
    console.log("Update product with index", index);
  };

  const handlePrintInvoice = () => {
    // You can implement printing functionality here
    console.log("Printing invoice...");
  };

  const handleSendEBill = () => {
    // You can implement sending e-bill functionality here
    console.log("Sending e-bill...");
  };

  const handleConfirmTransaction = () => {
    // You can implement confirm transaction functionality here
    console.log("Transaction confirmed...");
  };

  return (
    <div>
      <h2>Billing Details</h2>
      <div>
        <label>Customer Name:</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </div>
      <div>
        <label>Customer Email:</label>
        <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
      </div>
      <BillingForm onSubmit={handleAddProduct} />
      <ProductTable
        products={products}
        onDelete={handleDeleteProduct}
        onUpdate={handleUpdateProduct}
      />
      <div className="action-buttons">
        <button onClick={handlePrintInvoice}>Print Invoice</button>
        <button onClick={handleSendEBill}>Send E-Bill</button>
        <button onClick={handleConfirmTransaction}>Confirm Transaction</button>
      </div>
    </div>
  );
};

export default BillingUI;
