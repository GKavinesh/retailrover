import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.scss"
import Chart from "../../components/chart/Chart";

function Register() {
    const [employeename, setEmployeename] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/employee/save", {
                employeename: employeename,
                email: email,
                password: password,
            });
            alert("Employee Registration Successfully");
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <div className="container mt-4">
            <div className="row">
                    <h2>User Register</h2>
                    <hr />
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <form>
                        <div className="form-group">
                            <label>Employee name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                value={employeename}
                                onChange={(event) => setEmployeename(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-4" onClick={save}>Save</button>
                    </form>

                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
                <div className="col-sm-7"> {/* Added col-sm-6 class here */}
                    <Chart/>
                </div>
                </div>
                
            </div>
        </div>
    );
}

export default Register;
