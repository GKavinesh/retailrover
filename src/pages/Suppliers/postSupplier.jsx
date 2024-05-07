import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './postSupplier.scss';

const PostSupplier = () => {
  const [formData, setFormData] = useState({
    supplier_name: '',
    product_name: '',
    address:'',
    email: ''
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
      const response = await fetch('http://localhost:8080/api/supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowPopup(true);
        setFormData({
          supplier_name: '',
          product_name: '',
          address:'',
          email: ''
        });
        setTimeout(() => {
          setShowPopup(false);
        }, 5000); // Set the timeout for 5 seconds (5000 milliseconds)
      } else {
        console.log('Failed to submit Supplier');
      }
    } catch (error) {
      console.log('Error creating the new supplier:', error.message);
    }
  };

  return (
    <>
      <div className='center-form'>
        <h1>Add new supplier</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicsupplier_name'>
            <Form.Control
              type='text'
              name='supplier_name'
              placeholder='Enter Name'
              value={formData.supplier_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicproduct_name'>
            <Form.Control
              type='text'
              name='product_name'
              placeholder='Enter Product'
              value={formData.product_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicaddress'>
            <Form.Control
              type='text'
              name='address'
              placeholder='Enter Address'
              value={formData.address} // Corrected
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicemail'>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={formData.number} // Corrected
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='w-100'>
            Add Supplier
          </Button>
        </Form>
      </div>
      {showPopup && (
        <div className='popup'>
          <p>Supplier Successfully added!</p>
        </div>
      )}
    </>
  );
};

export default PostSupplier;