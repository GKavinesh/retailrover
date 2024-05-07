import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Employee.scss";
import PostEmployee from './postEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employee");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      setEmployees([]); // Reset employees to an empty array on error
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Our Employees</h1>
              <Button variant="primary" onClick={fetchEmployees}>Refresh Table</Button>
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
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.salary}</td>
                      <td className="action-buttons">
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleUpdate(employee.id)}
                          style={{ backgroundColor: '#28a745', borderColor: '#28a745' }} // Green background and border
                        >
                          <BorderColorIcon />
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(employee.id)}
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
        <PostEmployee />
      </div>
    </div>
  );
};

export default Employee;



