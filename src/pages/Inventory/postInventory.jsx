import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './postInventory.scss';

const PostInventory = () => {
  const [formData, setFormData] = useState({
    name: '',
    stockavailable: '',
    price:''
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
      const response = await fetch('http://localhost:8080/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowPopup(true);
        setFormData({
          name: '',
          stockavailable: '',
          price:''
        });
        setTimeout(() => {
          setShowPopup(false);
        }, 5000); // Set the timeout for 5 seconds (5000 milliseconds)
      } else {
        console.log('Failed to submit Inventory');
      }
    } catch (error) {
      console.log('Error creating the new inventory:', error.message);
    }
  };

  return (
    <>
      <div className='center-form'>
        <h1>Add new product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicname'>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter Product Name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicstockavailable'>
            <Form.Control
              type='text'
              name='stockavailable'
              placeholder='Enter Stock Available'
              value={formData.stockavailable}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicprice'>
            <Form.Control
              type='text'
              name='price'
              placeholder='Enter Price'
              value={formData.price} // Corrected
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='w-100'>
            Add Product
          </Button>
        </Form>
      </div>
      {showPopup && (
        <div className='popup'>
          <p>Product Successfully added!</p>
        </div>
      )}
    </>
  );
};

export default PostInventory;