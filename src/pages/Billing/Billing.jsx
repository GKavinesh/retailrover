import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./Billing.scss"; // You can create a billingForm.scss file for styling
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';
import Dropdown from 'react-bootstrap/Dropdown';
import emailjs from '@emailjs/browser';

const BillingForm = () => {
  const [billingData, setBillingData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [itemFields, setItemFields] = useState({
    id: "",
    itemName: "",
    quantity: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const componentPDF = useRef();
  const [billings, setBillings] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBillings, setFilteredBillings] = useState([]);
  const [filterBy, setFilterBy] = useState('Customer Name'); // Define filterBy state variable

  useEffect(() => {
    let total = 0;
    billingData.forEach((item) => {
      total += parseInt(item.quantity) * parseFloat(item.price);
    });
    setTotalPrice(total);
  }, [billingData]);

  const fetchBillings = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/billing');
      const data = await response.json();
      setBillings(data);
      setFilteredBillings(data); // Initially set filtered customers to all customers
    } catch (error) {
      console.error('Error fetching bills:', error.message);
    }
  };

  useEffect(() => {
    fetchBillings();
  }, []);

  const handleDelete = async (billingId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/billing/${billingId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setBillings((prevBillings) =>
          prevBillings.filter((billing) => billing.id !== billingId)
        );
      }

      console.log(`Bill with ID ${billingId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting bill:', error.message);
    }
  };

  const handleUpdate = (billingId) => {
    navigate(`/billing/${billingId}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredBillings(
      billings.filter(
        (billing) =>
          billing.customerName.toLowerCase().includes(query.toLowerCase()) ||
          billing.time.toLowerCase().includes(query.toLowerCase()) ||
          billing.totalpayment.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Define handleFilterChange to update the filterBy state variable
  const handleFilterChange = (filter) => {
    setFilterBy(filter);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'billing data',
    onAfterPrint: () => alert('The report has been generated'),
    contentStyle: `
      @media print {
        .action-buttons {
          display: none;
        }
      }
    `
  });


  const handleAddItem = () => {
    const newItem = { ...itemFields, id: Date.now() };
    setBillingData([...billingData, newItem]);
    setSuccessMessage("Item added successfully.");
    setOpenSnackbar(true);
    setItemFields({ id: "", itemName: "", quantity: "", price: "" });
  };


  const handleUpdateItem = () => {
    const updatedData = billingData.map((item) =>
      item.id === itemFields.id ? itemFields : item
    );
    setBillingData(updatedData);
    setSuccessMessage("Item updated successfully.");
    setOpenSnackbar(true);
    setItemFields({ id: "", itemName: "", quantity: "", price: "" });
  };

  const handleDeleteItem = (id) => {
    setBillingData(billingData.filter((item) => item.id !== id));
    setSuccessMessage("Item deleted successfully.");
    setOpenSnackbar(true);
  };


  const handleConfirmTransaction = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName, // Ensure customerName is included
          totalpayment: totalPrice // Assuming totalpayment field in the backend represents total price
        })
      });
  
      if (response.ok) {
        // Constructing the message content
      const templateParams = {
        customerName: customerName,
        totalpayment: totalPrice
      };

      await emailjs.send(
        'service_krhebjv', // Replace with your service ID
        'template_mwy74xp', // Replace with your template ID
        templateParams, // Pass templateParams object containing variable values
        'NmTm3A5AsD-NjtbBX' // Replace with your user ID
      );
  
        setShowPopup(true);
        setCustomerName('');
        setEmail('');
        setTotalPrice(0);
        setTimeout(() => {
          setShowPopup(false);
        }, 5000); // Set the timeout for 5 seconds (5000 milliseconds)
      } else {
        console.log('Failed to submit Billing');
      }
    } catch (error) {
      console.log('Error creating the new billing:', error.message);
    }
  };
  
  
  
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "itemName", headerName: "Item Name", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteItem(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="home">
  <Sidebar />
  <div className="homeContainer">
    <Navbar />
    <div className="billingForm">
      <div className="billingFormTitle">Billing</div>
      <div className="datagrid">
        <DataGrid
          rows={billingData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        />
      </div>
      <div className="inputFieldsContainer">
        <TextField
          type="text"
          className="inputField"
          label="Item Name"
          variant="outlined"
          value={itemFields.itemName}
          onChange={(e) =>
            setItemFields({ ...itemFields, itemName: e.target.value })
          }
        />
        <TextField
          type="number"
          className="inputField"
          label="Quantity"
          variant="outlined"
          value={itemFields.quantity}
          onChange={(e) =>
            setItemFields({ ...itemFields, quantity: e.target.value })
          }
        />
        <TextField
          type="number"
          className="inputField"
          label="Price"
          variant="outlined"
          value={itemFields.price}
          onChange={(e) =>
            setItemFields({ ...itemFields, price: e.target.value })
          }
        />
        <TextField
          type="text"
          className="inputField"
          label="Customer Name"
          variant="outlined"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <TextField
          type="email"
          className="emailInput"
          label="Enter Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <Button
          variant="contained"
          style={{ backgroundColor: '#44240d', color: 'white' , width: "150px"}}
          onClick={itemFields.id ? handleUpdateItem : handleAddItem}
        >
          {itemFields.id ? "Update" : "Add"}
        </Button>
       
      </div>
      
      <div className="totalPriceContainer">
        <span>Total Price : </span>
        <span>{totalPrice}</span>
      </div>
      <div className="confirmTransactionButtonContainer">
      <Button
  variant="contained"
  style={{ backgroundColor: '#44240d', color: 'white' }}
  onClick={handleConfirmTransaction}
>
  Confirm Transaction
</Button>

      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={successMessage ? "success" : "error"}
        >
          {successMessage || errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
    <Container className="mt-5" style={{ width: '90%', maxWidth: '1200px' }}> {/* Added style={{ width: '90%', maxWidth: '1200px' }} */}
      <Row>
        <Col>
          <h1 className="text-center">Latest Bills</h1>
          <Button variant="primary" onClick={fetchBillings}>
            Refresh Table
          </Button>
          <div className="search-bar" style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Search Bills..."
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
              <Dropdown.Item onClick={() => handleFilterChange('Customer Name')}>First Name</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange('Total Payment')}>Last Name</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div ref={componentPDF} style={{ width: '100%' }}>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Billing Time</th>
                  <th>Total Payment</th>
                  <th>Update / Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredBillings.map((billing) => (
                  <tr key={billing.id}>
                    <td>{billing.customerName}</td>
                    <td>{billing.time}</td>
                    <td>{billing.totalpayment}</td>
                    <td className="action-buttons">
                      <Button
                      variant="outline-secondary"
                      onClick={() => handleUpdate(billing.id)}
                      style={{ color: '#000' , marginRight: '5px'}} // Black border and text color
                      className="update-button" // Added class for update button
                      >
                      <BorderColorIcon />
                      </Button>
                      <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(billing.id)}
                      style={{color: '#000' }} // Black border and text color
                      className="delete-button" // Added class for delete button
                      >
                      <DeleteIcon />
                      </Button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <button className="btn btn-success" onClick={generatePDF}>
            Generate Report
          </button>
        </Col>
      </Row>
    </Container>
  </div>
</div>

  );
};

export default BillingForm;

