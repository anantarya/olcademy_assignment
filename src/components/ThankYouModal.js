import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ThankYouModal.css"

function ThankYouModal({ onClose }) {
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        onClose(); // Close the modal
        navigate("/"); // Navigate to the home page
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <p>Thank you for your purchase!</p>
                <button onClick={handleHomeButtonClick}>Back to Home</button>
            </div>
        </div>
    );
}

export default ThankYouModal;
