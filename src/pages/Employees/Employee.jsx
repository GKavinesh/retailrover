import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Employee.scss";
import 'bootstrap/dist/css/bootstrap.min.css';


const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async () => {
    const newEmployee = { fName, lName, email, salary };
    try {
      const response = await axios.post('http://localhost:8080/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
      const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await axios.put(`http://localhost:8080/api/employees/${updatedEmployee.id}`, updatedEmployee);
      const updatedEmployees = employees.map(employee =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="employee-container">
          <h2>Employee Management</h2>
          <form onSubmit={handleAddEmployee}>
            <input type="text" placeholder="First Name" value={fName} onChange={(e) => setFName(e.target.value)} required />
            <input type="text" placeholder="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            <button type="Add employee" class="btn btn-primary">Add</button>
          </form>
          <EmployeeTable
            employees={employees}
            onDelete={handleDeleteEmployee}
            onUpdate={handleUpdateEmployee}
          />
        </div>
      </div>
    </div>
  );
};

const EmployeeTable = ({ employees, onDelete, onUpdate }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.fName}</td>
            <td>{employee.lName}</td>
            <td>{employee.email}</td>
            <td>{employee.salary}</td>
            <td>
              <button onClick={() => onDelete(employee.id)}>Delete</button>
              <button onClick={() => onUpdate(employee)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Employee;

