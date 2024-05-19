import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import axios from "axios";
import "./Login.scss";
import Chart from "../../components/chart/Chart";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/employee/login", {
                email: email,
                password: password,
            });
    
            const data = response.data;
            console.log(data);
    
            if (data.message === "Email not exits") {
                alert("Email does not exist");
            } else if (data.message === "Login Success") {
                await updateLoginTime(email); // Call updateLoginTime after successful login
                navigate('/home');
            } else {
                alert("Incorrect email or password");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while logging in");
        }
    }
    

    async function updateLoginTime(email) {
        try {
            await axios.patch("http://localhost:8080/api/v1/employee/time", {
                email: email // Pass the user's email to identify the user
            });
            console.log("Login time updated successfully");
        } catch (err) {
            console.error("Error updating login time:", err);
        }
    }
    
    

    



    return (
        <div>
            <div className="container">
                <div className="row">
                    <h2>User Login</h2>
                    <hr />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <form>
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
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                        </form>

                        <p>Don't have an account? <Link to="/register">Register</Link></p> {/* Link to register page */}
                    </div>
                    <div className="col-sm-7"> {/* Added col-sm-6 class here */}
                    <Chart/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login ;
