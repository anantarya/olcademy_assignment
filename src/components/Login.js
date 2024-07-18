import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Login successful!', response.data.message);

            // Set user as logged in
            login(response.data);

            // After obtaining the token during login
            const token = response.data.token;

            // Decode the token
            // const decodedUser = generateToken(token);

            // Set the token in axios headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Redirect to the home page
            redirectToHome();
        } catch (error) {
            console.error('Login failed:', error.message);
            console.log('Detailed error:', error.response?.data); // Log detailed error
        }
    };

    const redirectToHome = () => {
        // Use this callback for redirection
        navigate('/', { replace: true });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="form-group mb-4">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="rememberCheck"
                                        checked
                                    />
                                    <label className="form-check-label" htmlFor="rememberCheck">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div> */}

                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleLogin}>
                            Sign in
                        </button>

                        <div className="text-center">
                            <p>
                                Not a member? <Link to="/signup">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
