import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Inventory.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
// Import other necessary components if needed

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
        {products.map((product) => (
          <tr key={product.ProductID}>
            <td>{product.ProductID}</td>
            <td>{product.ProductName}</td>
            <td>{product.QuantityInStock}</td>
            <td>{product.UnitPrice}</td>
            <td>
              <button onClick={() => onDelete(product.ProductID)}>Delete</button>
              <button onClick={() => onUpdate(product)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProductForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ProductName: name, QuantityInStock: stock, UnitPrice: price });
    setName('');
    setStock('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="button" class="btn btn-primary">Add</button>
    </form>
  );
};

const InventoryUI = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/inventory');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:8080/api/inventory', product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/${productId}`);
      const updatedProducts = products.filter(product => product.ProductID !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:8080/api/inventory/${updatedProduct.ProductID}`, updatedProduct);
      const updatedProducts = products.map(product =>
        product.ProductID === updatedProduct.ProductID ? updatedProduct : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="inventory-container">
          <h2>Inventory Management</h2>
          <ProductForm onSubmit={handleAddProduct} />
          <InventoryTable
            products={products}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryUI;




