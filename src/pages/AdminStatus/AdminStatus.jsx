import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './AdminStatus.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Dropdown from 'react-bootstrap/Dropdown';

const AdminStatus = () => {
  const componentPDF = useRef();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterBy, setFilterBy] = useState('employee name'); // Define filterBy state variable

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/employee/admin');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data); // Initially set filtered customers to all customers
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.employeeName.toLowerCase().includes(query.toLowerCase()) ||
          user.loginTime.toLowerCase().includes(query.toLowerCase())
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

  // Function to render the table content including headings
  const renderTableContent = () => (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Login Time</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.employeeName}</td>
            <td>{user.loginTime}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5" style={{ width: '90%', maxWidth: '1200px' }}>
          <Row>
            <Col>
              <h1 className="text-center">User Log </h1>
              <Button variant="primary" onClick={fetchUsers}>
                Refresh Table
              </Button>
              <div className="search-bar" style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Search users..."
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
                  <Dropdown.Item onClick={() => handleFilterChange('Employee Name')}>Employee Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange('Login Time')}>Login Time</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div ref={componentPDF} style={{ width: '100%' }}>
                {renderTableContent()}
              </div>
              <button className="btn btn-success" onClick={generatePDF}>
                Generate Report
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminStatus;
