
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./billingForm.scss"; // You can create a billingForm.scss file for styling

const BillingForm = () => {
  const [billingData, setBillingData] = useState([]);
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

  const handleAddItem = () => {
    const newItem = { ...itemFields, id: Date.now() };
    setBillingData([...billingData, newItem]);
    setSuccessMessage("Item added successfully.");
    setOpenSnackbar(true);
    setItemFields({ id: "", itemName: "", quantity: "", price: "" });
  };

  const handleEditItem = (id) => {
    const selectedItem = billingData.find((item) => item.id === id);
    setItemFields(selectedItem);
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

  const handleSendEBill = () => {
    // Implement logic to send e-bill via email
    if (email) {
      console.log("Sending E-bill to:", email);
      setSuccessMessage("E-bill sent successfully.");
      setOpenSnackbar(true);
    } else {
      setErrorMessage("Please enter a valid email address.");
      setOpenSnackbar(true);
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
    <div className="billingForm">
      <div className="billingFormTitle">Billing Details</div>
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
        <Button
          variant="contained"
          color="primary"
          onClick={itemFields.id ? handleUpdateItem : handleAddItem}
        >
          {itemFields.id ? "Update" : "Add"}
        </Button>
      </div>
      <div className="emailInputContainer">
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
          color="primary"
          onClick={handleSendEBill}
        >
          Send E-bill
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
  );
};

export default BillingForm;




