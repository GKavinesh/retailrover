import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Supplier.scss";
import PostSupplier from './postSupplier.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/supplier");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
    }
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/supplier/${supplierId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.id !== supplierId)
        );
      }

      console.log(`Supplier with ID ${supplierId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting supplier:", error.message);
    }
  }

  const handleUpdate = (supplierId) => {
    navigate(`/supplier/${supplierId}`);
  }

 return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Our Suppliers</h1>
              <Button variant="primary" onClick={fetchSuppliers}>Refresh Table</Button>
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.supplier_name}</td>
                      <td>{supplier.product_name}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.email}</td>
                      <td className="action-buttons">
                      <Button
                      variant="outline-secondary"
                      onClick={() => handleUpdate(supplier.id)}
                      style={{ backgroundColor: '#28a745', borderColor: '#28a745' }} // Green background and border
                      >
                        <BorderColorIcon />
                        </Button>
                        <Button
                        variant="outline-danger" 
                        onClick={() => handleDelete(supplier.id)}
                        style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }} // Red background and border
                        >
                          <DeleteIcon />
                          </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        <PostSupplier />
      </div>
    </div>
  );
};

export default Supplier;

