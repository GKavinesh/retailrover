import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { customersData } from '../../data';
import Sidebar from"../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Customer.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

function Add({ customers, setCustomers, setIsAdding }) {
    // Add component implementation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [date, setDate] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    const handleAdd = e => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !gender || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = customers.length + 1;
        const newCustomer = {
            id,
            firstName,
            lastName,
            email,
            gender,
            date
        };

        const updatedCustomers = [...customers, newCustomer];
        setCustomers(updatedCustomers);
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
                <h1>Add Customer</h1>
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
                <label htmlFor="gender">Gender</label>
                <input
                    id="gender"
                    type="text"
                    name="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                />
                <label htmlFor="date">Date Of Birth</label>
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

function Edit({ customers, selectedCustomer = {}, setCustomers, setIsEditing }) {
  const id = selectedCustomer ? selectedCustomer.id : '';

  const [firstName, setFirstName] = useState(selectedCustomer ? selectedCustomer.firstName : '');
  const [lastName, setLastName] = useState(selectedCustomer ? selectedCustomer.lastName : '');
  const [email, setEmail] = useState(selectedCustomer ? selectedCustomer.email : '');
  const [gender, setGender] = useState(selectedCustomer ? selectedCustomer.salary : '');
  const [date, setDate] = useState(selectedCustomer ? selectedCustomer.date : '');

  const handleUpdate = e => {
      e.preventDefault();

      if (!firstName || !lastName || !email || !gender || !date) {
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'All fields are required.',
              showConfirmButton: true
          });
      }

      const customer = {
          id,
          firstName,
          lastName,
          email,
          gender,
          date
      };

      for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === id) {
              customers.splice(i, 1, customer);
              break;
          }
      }

      setCustomers(customers);
      setIsEditing(false);

      Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${customer.firstName} ${customer.lastName}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500
      });
  };

  return (
      <div className="small-container">
          <form onSubmit={handleUpdate}>
              <h1>Edit Customer</h1>
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
              <label htmlFor="gender">Gender</label>
              <input
                  id="gender"
                  type="text"
                  name="gender"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
              />
              <label htmlFor="date">Date Of Birth</label>
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
        <h1>Customer Management </h1>
        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
            <button onClick={() => setIsAdding(true)} className='round-button'>Add Customer</button>
        </div>
       
    </header>
    
)
}

function List({ customers = [], handleEdit, handleDelete }) {
  return (
    
      <div className='contain-table'>
          <table className='striped-table'>
              <thead>
                  <tr>
                      <th>Customer-ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Date Of Birth</th>
                      <th colSpan={2} className="text-center">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {customers.length > 0 ? (
                      customers.map((customer, i) => (
                          <tr key={customer.id}>
                              <td>{i + 1}</td>
                              <td>{customer.firstName}</td>
                              <td>{customer.lastName}</td>
                              <td>{customer.email}</td>
                              <td>{customer.gender}</td>
                              <td>{customer.date} </td>
                              <td className="text-right">
                                  <button
                                      onClick={() => handleEdit(customer.id)}
                                      className="button muted-button"
                                  >
                                      Edit
                                  </button>
                              </td>
                              <td className="text-left">
                                  <button
                                      onClick={() => handleDelete(customer.id)}
                                      className="button muted-button"
                                  >
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={7}>No Customer</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
      
  )
}

function Dashboard() {
    const [customers, setCustomers] = useState(customersData);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const customer = customers.find(customer => customer.id === id);

        setSelectedCustomer(customer);
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
                const customer = customers.find(customer => customer.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${customer.firstName} ${customer.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setCustomers(customers.filter(customer => customer.id !== id));
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
                        customers={customers}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    customers={customers}
                    setCustomers={setCustomers}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                    customers={customers}
                    selectedCustomer={selectedCustomer}
                    setCustomers={setCustomers}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
        </div>
        </div>
    );
}


export default Dashboard;


