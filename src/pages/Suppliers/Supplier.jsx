
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import {  suppliersData } from '../../data';
import Sidebar from"../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Supplier.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

function Add({ suppliers, setSuppliers, setIsAdding }) {
    // Add component implementation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    const handleAdd = e => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !phoneNumber) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = suppliers.length + 1;
        const newSupplier = {
            id,
            firstName,
            lastName,
            email,
            phoneNumber
        };

        const updatedSuppliers = [...suppliers, newSupplier];
        setSuppliers(updatedSuppliers);
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
                <h1>Add Supplier</h1>
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
                <label htmlFor="phoneNumber">Phone-Number ($)</label>
                <input
                    id="phoneNumber"
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
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

function Edit({ suppliers, selectedSupplier = {}, setSuppliers, setIsEditing }) {
  const id = selectedSupplier ? selectedSupplier.id : '';

  const [firstName, setFirstName] = useState(selectedSupplier? selectedSupplier.firstName : '');
  const [lastName, setLastName] = useState(selectedSupplier ? selectedSupplier.lastName : '');
  const [email, setEmail] = useState(selectedSupplier ? selectedSupplier.email : '');
  const [phoneNumber, setPhoneNumber] = useState(selectedSupplier ? selectedSupplier.salary : '');
  

  const handleUpdate = e => {
      e.preventDefault();

      if (!firstName || !lastName || !email || !phoneNumber) {
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'All fields are required.',
              showConfirmButton: true
          });
      }

      const supplier = {
          id,
          firstName,
          lastName,
          phoneNumber
      };

      for (let i = 0; i < suppliers.length; i++) {
          if (suppliers[i].id === id) {
              suppliers.splice(i, 1, supplier);
              break;
          }
      }

      setSuppliers(suppliers);
      setIsEditing(false);

      Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${supplier.firstName} ${supplier.lastName}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500
      });
  };

  return (
      <div className="small-container">
          <form onSubmit={handleUpdate}>
              <h1>Edit Supplier</h1>
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
              <label htmlFor="phoneNumber">Phone-Number</label>
              <input
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
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
        <h1>Supplier Management </h1>
        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
            <button onClick={() => setIsAdding(true)} className='round-button'>Add Supplier</button>
        </div>
       
    </header>
    
)
}

function List({ suppliers = [], handleEdit, handleDelete }) {
    // List component implementation
    
  

  return (
    
      <div className='contain-table'>
          <table className='striped-table'>
              <thead>
                  <tr>
                      <th>Supplier-ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone-Number</th>
                      <th colSpan={2} className="text-center">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {suppliers.length > 0 ? (
                      suppliers.map((supplier, i) => (
                          <tr key={supplier.id}>
                              <td>{i + 1}</td>
                              <td>{supplier.firstName}</td>
                              <td>{supplier.lastName}</td>
                              <td>{supplier.email}</td>
                              <td>{supplier.phoneNumber} </td>
                              <td className="text-right">
                                  <button
                                      onClick={() => handleEdit(supplier.id)}
                                      className="button muted-button"
                                  >
                                      Edit
                                  </button>
                              </td>
                              <td className="text-left">
                                  <button
                                      onClick={() => handleDelete(supplier.id)}
                                      className="button muted-button"
                                  >
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={7}>No Suppliers</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
      
  )
}

function Dashboard() {
    const [suppliers, setSuppliers] = useState(suppliersData);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const supplier = suppliers.find(supplier => supplier.id === id);

        setSelectedSupplier(supplier);
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
              const supplier = suppliers.find(supplier => supplier.id === id);
  
              Swal.fire({
                  icon: 'success',
                  title: 'Deleted!',
                  text: `${supplier.firstName} ${supplier.lastName}'s data has been deleted.`,
                  showConfirmButton: false,
                  timer: 1500,
              });
  
              setSuppliers(suppliers.filter(supplier => supplier.id !== id));
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
                        suppliers={suppliers}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                suppliers={suppliers}
                    setSuppliers={setSuppliers}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                suppliers={suppliers}
                    selectedSupplier={selectedSupplier}
                    setSuppliers={setSuppliers}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
        </div>
        </div>
    );
}


export default Dashboard;



