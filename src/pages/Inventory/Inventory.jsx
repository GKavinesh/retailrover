import React, { useState, useEffect, useRef } from 'react';
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
import Chart from "../../components/chart/Chart";
import { useReactToPrint } from 'react-to-print';
import Dropdown from 'react-bootstrap/Dropdown';

const Inventory = () => {
  const componentPDF = useRef();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState(''); // Added state for filterBy
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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  }

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
  }

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Inventory data",
    onAfterPrint: () => alert("The report has been generated"),
    contentStyle: `
      @media print {
        .action-buttons {
          display: none;
        }
      }
    `
  });

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Stock Inventory</h1>
              <Button variant="contained" className="customButton" onClick={fetchInventoryItems}>Refresh Table</Button>
              <div className="search-bar" style={{ marginTop: '10px' }}>
                <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control"
                />
                </div>

              <Dropdown style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" drop="end">
                  Filter By: {filterBy}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleFilterChange('Product Name')}>Product Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange('Stock Available')}>Stock Available</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange('Price')}>Price</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div ref={componentPDF} style={{ width: '100%' }}>
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
                    {inventoryItems.map((inventory) => (
                      <tr key={inventory.id}>
                        <td>{inventory.name}</td>
                        <td>{inventory.stockavailable}</td>
                        <td>{inventory.price}</td>
                        <td className="action-buttons">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleUpdate(inventory.id)}
                           // Green background and border
                          >
                            <BorderColorIcon />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(inventory.id)}
                             // Red background and border
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <button className='btn btn-success' onClick={generatePDF}>Generate Report</button>
            </Col>
            <Col sm={4}>
              <PostInventory />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Inventory;





