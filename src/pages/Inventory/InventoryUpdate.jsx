import "./UpdateInventory.scss";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UpdateInventory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: "",
        stockavailable: "",
        price:""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/inventory/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error("Failed to fetch inventory");
                }
            } catch (error) {
                console.error("Error fetching inventory: ", error.message);
            }
        };

        fetchInventory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/api/inventory/${id}`,{
                method : 'PATCH',
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Employee inventory: ",data);


            navigate(`/employee`)
        }catch (error){
            console.error("Error updating inventory:",error.message);
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
                <div className="form-title">Edit Inventory</div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="Name"
                            placeholder="Enter Name"
                            value={formData.Name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicproduct">
                        <Form.Control
                            type="text"
                            name="stockavailable"
                            placeholder="Enter Stock Available"
                            value={formData.product}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicprice">
                        <Form.Control
                            type="text"
                            name="price"
                            placeholder="Enter Price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">Edit Inventory</Button>
                </Form>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default UpdateInventory;