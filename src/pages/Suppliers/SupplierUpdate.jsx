import "./updateSupplier.scss";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UpdateSupplier = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        supplier_name: "",
        product_name: "",
        address:"",
        email: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/supplier/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error("Failed to fetch supplier");
                }
            } catch (error) {
                console.error("Error fetching supplier: ", error.message);
            }
        };

        fetchSupplier();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/api/supplier/${id}`,{
                method : 'PATCH',
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Employee supplier: ",data);


            navigate(`/supplier`)
        }catch (error){
            console.error("Error updating supplier:",error.message);
        }
    };

    return (
        <>
        <div class="home">
        <Sidebar />
        <div class="homeContainer">
        <Navbar/>
            <div className="center-form">
            <div className="form-container">
                <div className="form-title">Edit Supplier Details</div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicsupplier_name">
                        <Form.Control
                            type="text"
                            name="supplier_name"
                            placeholder="Enter Name"
                            value={formData.supplier_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicproduct_name">
                        <Form.Control
                            type="text"
                            name="product_name"
                            placeholder="Enter Product"
                            value={formData.product_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicaddress">
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicemail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">Edit Supplier</Button>
                </Form>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default UpdateSupplier;