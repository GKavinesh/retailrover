import "./updateEmployee.scss";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        salary: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error("Failed to fetch employee");
                }
            } catch (error) {
                console.error("Error fetching employee: ", error.message);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/api/employee/${id}`,{
                method : 'PATCH',
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Employee updated: ",data);


            navigate(`/employee`)
        }catch (error){
            console.error("Error updating employee:",error.message);
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
                <div className="form-title">Edit Employee Details</div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicfirstName">
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasiclastName">
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicSalary">
                        <Form.Control
                            type="text"
                            name="salary"
                            placeholder="Enter Salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Edit Employee</Button>
                </Form>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default UpdateEmployee;