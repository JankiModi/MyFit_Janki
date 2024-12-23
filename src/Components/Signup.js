import React, { useState } from "react";
import "../user.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Loading Spinner Component
const LoadingSpinner = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
          </svg>
        </div>
        <h2 className="modal-title">Welcome to MyFit!</h2>
        <p className="modal-message">
          You've successfully created an account !
        </p>
        <button className="modal-button" onClick={handleClose}>
          Login to Continue
        </button>
      </div>
    </div>
  );
};

export default function Signup() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    isPremiumUser: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      alert("Passwords don't match");
      navigate("/signup");
      return;
    }

    const valid_data = {
      username: formData.username,
      email: formData.email,
      password: formData.password1,
      isPremiumUser: false,
    };

    setIsLoading(true); // Set loading to true during API call

    try {
      const response = await axios.post(
        "https://my-fit-backend-2.onrender.com/app/register/",
        valid_data
      );
      console.log("User registered:", response.data);
      setIsModalOpen(true);
      setFormData({
        username: "",
        email: "",
        password1: "",
        password2: "",
        isPremiumUser: false,
      });
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setIsLoading(false); // Set loading to false once response is received
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/login"); // Navigate to home page after closing modal
  };

  return (
    <div>
      <section className="login-page">
        <div className="image-section"></div>

        <div className="form-section">
          <div className="login-body">
            <h2 className="login-header">Signup</h2>
            <hr className="horizontal-line" />
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="username"
                  className="input"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="email-id"
                  className="input"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="create password (6 - 10 characters)"
                  className="input"
                  maxLength={10}
                  minLength={6}
                  id="password1"
                  name="password1"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                />
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 3h2v4h-2v-4zm3-5V7a3 3 0 0 0-6 0v1h6z" />
                </svg>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="re-enter password"
                  className="input"
                  maxLength={10}
                  minLength={6}
                  id="password2"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 3h2v4h-2v-4zm3-5V7a3 3 0 0 0-6 0v1h6z" />
                </svg>
              </div>
              <button className="submit" type="submit">
                Submit
              </button>
              <div className="login-footer">
                <Link to="/login" className="new-user">
                  Already have an account?
                </Link>
              </div>
            </form>
            <Modal isOpen={isModalOpen} handleClose={handleCloseModal} />
          </div>
        </div>
      </section>

      {/* Loading Spinner */}
      <LoadingSpinner isOpen={isLoading} />
    </div>
  );
}
