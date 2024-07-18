import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { login } = useAuth(); // Import useAuth hook

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            console.log('Signup successful!');
            login(response.data);
        } catch (error) {
            console.error('Signup failed:', error.message);
            console.log('Error response:', error.response); // Log detailed error response
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="form-group mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSignup}>
                            Sign Up
                        </button>

                        <div className="text-center">
                            <p>
                                Already a member? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
