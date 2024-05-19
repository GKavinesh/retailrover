import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Container from 'react-bootstrap/Container';
import PostEmployee from './postEmployee';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';
import Dropdown from 'react-bootstrap/Dropdown';

const Employee = () => {
  const componentPDF = useRef();
  const [employees, setEmployees] = useState([]);

  const [filterBy, setFilterBy] = useState(''); // Define filterBy state
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchemployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/employee');
      const employees = await response.json();
      setEmployees(employees);
      setFilteredEmployees(employees);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  };


  

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
      } else {
        throw new Error('Failed to delete employee');
      }

      console.log(`Employee with ID ${employeeId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  }

  const handleUpdate = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredEmployees(
      employees.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(query.toLowerCase()))
      )
    );
  };

  const handleFilterChange = (filter) => { 
    setFilterBy(filter);
  };

  

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Employee data",
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
              <h1 className="text-center">Our Employees</h1>
              <Button variant="primary" onClick={fetchemployees}>Refresh Table</Button>
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
                  <Dropdown.Item onClick={() => handleFilterChange('First Name')}>First Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange('Last Name')}>Last Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange('salary')}>Salary</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div ref={componentPDF} style={{ width: '100%' }}>
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Salary</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.salary}</td>
                        <td className="action-buttons">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleUpdate(employee.id)}
                            
                          >
                            <BorderColorIcon />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(employee.id)}
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
              <PostEmployee />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Employee;






