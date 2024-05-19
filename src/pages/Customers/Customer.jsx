import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './Customer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostCustomer from './postCustomer.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';
import Dropdown from 'react-bootstrap/Dropdown';

const Customer = () => {
  const componentPDF = useRef();
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filterBy, setFilterBy] = useState('Name'); // Define filterBy state variable

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/customer');
      const data = await response.json();
      setCustomers(data);
      setFilteredCustomers(data); // Initially set filtered customers to all customers
    } catch (error) {
      console.error('Error fetching customers:', error.message);
    }
  };

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
      console.error('Error deleting customer:', error.message);
    }
  };

  const handleUpdate = (customerId) => {
    navigate(`/customer/${customerId}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredCustomers(
      customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(query.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(query.toLowerCase()) ||
          customer.email.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Define handleFilterChange to update the filterBy state variable
  const handleFilterChange = (filter) => {
    setFilterBy(filter);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'supplier data',
    onAfterPrint: () => alert('The report has been generated'),
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
    <Container className="mt-5" style={{ width: '90%', maxWidth: '1200px' }}> {/* Added style={{ width: '90%', maxWidth: '1200px' }} */}
      <Row>
        <Col>
          <h1 className="text-center">Our Customers</h1>
          <Button variant="primary" onClick={fetchCustomers}>
            Refresh Table
          </Button>
          <div className="search-bar" style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Search customers..."
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
              <Dropdown.Item onClick={() => handleFilterChange('First Name')}>First Name</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange('Last Name')}>Last Name</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange('Email')}>Email</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div ref={componentPDF} style={{ width: '100%' }}>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Update / Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td className="action-buttons">
                      <Button
                      variant="outline-secondary"
                      onClick={() => handleUpdate(customer.id)}
                      style={{ color: '#000' , marginRight: '5px'}} // Black border and text color
                      className="update-button" // Added class for update button
                      >
                      <BorderColorIcon />
                      </Button>
                      <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(customer.id)}
                      style={{color: '#000' }} // Black border and text color
                      className="delete-button" // Added class for delete button
                      >
                      <DeleteIcon />
                      </Button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <button className="btn btn-success" onClick={generatePDF}>
            Generate Report
          </button>
        </Col>
        <Col sm={4} className="mt-5"> {/* Added className="mt-5" */}
          <PostCustomer />
        </Col>
      </Row>
    </Container>
  </div>
</div>

  );
};

export default Customer;
