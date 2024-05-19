import "./updateBilling.scss";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UpdateBilling = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: "",
        totalpayment: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/billing/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched billing data:", data); // Log fetched data
                    setFormData(data);
                } else {
                    console.error("Failed to fetch bill");
                }
            } catch (error) {
                console.error("Error fetching bill: ", error.message);
            }
        };

        fetchBilling();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("FormData before submitting:", formData); // Log formData before submitting
            const response = await fetch(`http://localhost:8080/api/billing/${id}`,{
                method : 'PATCH',
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Billing updated: ",data);

            navigate(`/billing`)
        }catch (error){
            console.error("Error updating billing:",error.message);
        }
    };

    return (
        <>
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar/>
                <div className="center-form">
                    <div className="form-container">
                        <div className="form-title">Edit Billing Details</div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasiccustomerName">
                                <Form.Control
                                    type="text"
                                    name="customerName"
                                    placeholder="Enter Customer Name"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasictotalpayment">
                                <Form.Control
                                    type="text"
                                    name="totalpayment"
                                    placeholder="Enter Total Payment"
                                    value={formData.totalpayment}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">Edit Bill</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default UpdateBilling;
