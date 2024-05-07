import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './postEmployee.scss';

const PostEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    salary: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowPopup(true);
        setFormData({
          firstName: '',
          lastName: '',
          salary: ''
        });
        setTimeout(() => {
          setShowPopup(false);
        }, 5000); // Set the timeout for 5 seconds (5000 milliseconds)
      } else {
        console.log('Failed to submit employee');
      }
    } catch (error) {
      console.log('Error creating the new employee:', error.message);
    }
  };

  return (
    <>
      <div className='center-form'>
        <h1>Add new employee</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicfirstName'>
            <Form.Control
              type='text'
              name='firstName'
              placeholder='Enter First Name'
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasiclastName'>
            <Form.Control
              type='text'
              name='lastName'
              placeholder='Enter Last Name'
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicsalary'>
            <Form.Control
              type='text'
              name='salary'
              placeholder='Enter Salary'
              value={formData.salary} // Corrected
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='w-100'>
            Add Employee
          </Button>
        </Form>
      </div>
      {showPopup && (
        <div className='popup'>
          <p>Employee Successfully added!</p>
        </div>
      )}
    </>
  );
};

export default PostEmployee;
