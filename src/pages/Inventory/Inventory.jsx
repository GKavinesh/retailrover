import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Inventory.scss";
import PostInventory from './postInventory.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Inventory = () => {
  const [inventoryitems, setInventoryItems] = useState([]);
  const navigate = useNavigate();

  const fetchInventoryItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/inventory");
      const data = await response.json();
      setInventoryItems(data);
    } catch (error) {
      console.error("Error fetching inventory items:", error.message);
    }
  }

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const handleDelete = async (inventoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/${inventoryId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setInventoryItems((prevInventoryItems) =>
          prevInventoryItems.filter((inventory) => inventory.id !== inventoryId)
        );
      }

      console.log(`Inventory with ID ${inventoryId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting inventory:", error.message);
    }
  }

  const handleUpdate = (inventoryId) => {
    navigate(`/inventory/${inventoryId}`);
  }

 return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Stock Inventory</h1>
              <Button variant="primary" onClick={fetchInventoryItems}>Refresh Table</Button>
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Stock Available</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryitems.map((inventory) => (
                    <tr key={inventory.id}>
                      <td>{inventory.name}</td>
                      <td>{inventory.stockavailable}</td>
                      <td>{inventory.price}</td>
                      <td className="action-buttons">
                      <Button
                      variant="outline-secondary"
                      onClick={() => handleUpdate(inventory.id)}
                      style={{ backgroundColor: '#28a745', borderColor: '#28a745' }} // Green background and border
                      >
                        <BorderColorIcon />
                        </Button>
                        <Button
                        variant="outline-danger" 
                        onClick={() => handleDelete(inventory.id)}
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
        <PostInventory />
      </div>
    </div>
  );
};

export default Inventory;




