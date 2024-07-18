import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user, login, authToken } = useAuth(); // Assuming you have a way to get the auth token

    const [formData, setFormData] = useState({
        email: user.email || '',  // Default to an empty string if user.email is undefined
        password: '',            // You can decide whether to allow changing the password
        name: user.name || '',
        avatar: null,
        // Add other fields as needed
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({ ...formData, avatar: file });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('authToken:', authToken);
            let avatarUrl = user.avatar;

            if (formData.avatar) {
                const avatarData = new FormData();
                avatarData.append('avatar', formData.avatar);

                const avatarResponse = await fetch('http://localhost:5000/api/auth/upload-avatar', {
                    method: 'POST',
                    body: avatarData,
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (avatarResponse.ok) {
                    const avatarData = await avatarResponse.json();
                    avatarUrl = avatarData.avatarUrl;
                } else {
                    throw new Error('Failed to upload avatar');
                }
            }

            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ ...formData, avatar: avatarUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            login({ ...user, ...formData, avatar: avatarUrl });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Profile Image Upload */}
                {formData.avatar && (
                    <img
                        src={formData.avatar}
                        alt="Profile Avatar"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
