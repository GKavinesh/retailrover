import "./Employee.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { employeesData } from '../../data';
import Sidebar from"../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function Add({ employees, setEmployees, setIsAdding }) {
    // Add component implementation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    const handleAdd = e => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = employees.length + 1;
        const newEmployee = {
            id,
            firstName,
            lastName,
            email,
            salary,
            date
        };

        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${lastName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
     
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    ref={textInput}
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="salary">Salary ($)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

function Edit({ employees, selectedEmployee = {}, setEmployees, setIsEditing }) {
  const id = selectedEmployee ? selectedEmployee.id : '';

  const [firstName, setFirstName] = useState(selectedEmployee ? selectedEmployee.firstName : '');
  const [lastName, setLastName] = useState(selectedEmployee ? selectedEmployee.lastName : '');
  const [email, setEmail] = useState(selectedEmployee ? selectedEmployee.email : '');
  const [salary, setSalary] = useState(selectedEmployee ? selectedEmployee.salary : '');
  const [date, setDate] = useState(selectedEmployee ? selectedEmployee.date : '');

  const handleUpdate = e => {
      e.preventDefault();

      if (!firstName || !lastName || !email || !salary || !date) {
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'All fields are required.',
              showConfirmButton: true
          });
      }

      const employee = {
          id,
          firstName,
          lastName,
          email,
          salary,
          date
      };

      for (let i = 0; i < employees.length; i++) {
          if (employees[i].id === id) {
              employees.splice(i, 1, employee);
              break;
          }
      }

      setEmployees(employees);
      setIsEditing(false);

      Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500
      });
  };

  return (
      <div className="small-container">
          <form onSubmit={handleUpdate}>
              <h1>Edit Employee</h1>
              <label htmlFor="firstName">First Name</label>
              <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="salary">Salary ($)</label>
              <input
                  id="salary"
                  type="number"
                  name="salary"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
              />
              <label htmlFor="date">Date</label>
              <input
                  id="date"
                  type="date"
                  name="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
              />
              <div style={{ marginTop: '30px' }}>
                  <input type="submit" value="Update" />
                  <input
                      style={{ marginLeft: '12px' }}
                      className="muted-button"
                      type="button"
                      value="Cancel"
                      onClick={() => setIsEditing(false)}
                  />
              </div>
          </form>
      </div>
  );
}

function Header({ setIsAdding }) {
  return (
    
    <header>
        <h1>Employee Management </h1>
        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
            <button onClick={() => setIsAdding(true)} className='round-button'>Add Employee</button>
        </div>
       
    </header>
    
)
}

function List({ employees = [], handleEdit, handleDelete }) {
    // List component implementation
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: null
  });

  return (
    
      <div className='contain-table'>
          <table className='striped-table'>
              <thead>
                  <tr>
                      <th>Employee-ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Salary</th>
                      <th>Date</th>
                      <th colSpan={2} className="text-center">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {employees.length > 0 ? (
                      employees.map((employee, i) => (
                          <tr key={employee.id}>
                              <td>{i + 1}</td>
                              <td>{employee.firstName}</td>
                              <td>{employee.lastName}</td>
                              <td>{employee.email}</td>
                              <td>{formatter.format(employee.salary)}</td>
                              <td>{employee.date} </td>
                              <td className="text-right">
                                  <button
                                      onClick={() => handleEdit(employee.id)}
                                      className="button muted-button"
                                  >
                                      Edit
                                  </button>
                              </td>
                              <td className="text-left">
                                  <button
                                      onClick={() => handleDelete(employee.id)}
                                      className="button muted-button"
                                  >
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={7}>No Employees</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
      
  )
}

function Dashboard() {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const employee = employees.find(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.isConfirmed) {
                const employee = employees.find(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    };

    return (
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='container'>
            
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
        </div>
        </div>
    );
}


export default Dashboard;



