import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Customer.scss";
import PostCustomer from './postCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/customer");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/customer/${customerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== customerId)
        );
      }

      console.log(`Customer with ID ${customerId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting customer:", error.message);
    }
  }

  const handleUpdate = (customerId) => {
    navigate(`/customer/${customerId}`);
  }

 return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Our Customers</h1>
              <Button variant="primary" onClick={fetchCustomers}>Refresh Table</Button>
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.email}</td>
                      <td className="action-buttons">
                      <Button
                      variant="outline-secondary"
                      onClick={() => handleUpdate(customer.id)}
                      style={{ backgroundColor: '#28a745', borderColor: '#28a745' }} // Green background and border
                      >
                        <BorderColorIcon />
                        </Button>
                        <Button
                        variant="outline-danger" 
                        onClick={() => handleDelete(customer.id)}
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
        <PostCustomer />
      </div>
    </div>
  );
};

export default Customer;

