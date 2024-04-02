import React, { useState } from 'react';
import "./Inventory.scss";

const InventoryTable = ({ products, onDelete, onUpdate }) => {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.stock}</td>
            <td>{product.price}</td>
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

const ProductForm = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, name, stock, price });
    setId('');
    setName('');
    setStock('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product ID" value={id} onChange={(e) => setId(e.target.value)} required />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

const InventoryUI = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h2>Inventory Management</h2>
      <ProductForm onSubmit={handleAddProduct} />
      <InventoryTable
        products={products}
        onDelete={handleDeleteProduct}
        onUpdate={handleUpdateProduct}
      />
    </div>
  );
};

export default InventoryUI;

