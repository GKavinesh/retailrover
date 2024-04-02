import React, { useState } from 'react';
import "./Employee.scss";

const EmployeeTable = ({ employees, onDelete, onUpdate }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>
              <button onClick={() => onDelete(index)}>Delete</button>
              <button onClick={() => onUpdate(index)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const EmployeeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, department });
    setName('');
    setEmail('');
    setDepartment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

const EmployeeUI = () => {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleUpdateEmployee = (index) => {
    // You can implement update functionality here
    console.log("Update employee with index", index);
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <EmployeeForm onSubmit={handleAddEmployee} />
      <EmployeeTable
        employees={employees}
        onDelete={handleDeleteEmployee}
        onUpdate={handleUpdateEmployee}
      />
    </div>
  );
};

export default EmployeeUI;

