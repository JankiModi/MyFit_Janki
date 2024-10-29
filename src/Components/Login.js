import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../user.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Loading Spinner Component
const LoadingModal = ({ isOpen }) => {
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
        <h2 className="modal-title">Welcome Back!</h2>
        <p className="modal-message">
          You've successfully logged in to your account.
        </p>
        <button className="modal-button" onClick={handleClose}>
          Continue to Home
        </button>
      </div>
    </div>
  );
};

export default function Login({ setData }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    try {
      const response = await axios.post(
        "https://my-fit-backend-2.onrender.com/app/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.status === "success") {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("isPremiumUser", data.isPremiumUser);

        setData({
          username: data.username,
          email: data.email,
          isPremiumUser: data.isPremiumUser,
        });
        console.log("User logged in:", response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Login failed!", error);
      setMessage("No record found. Please Try Again!");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <section className="login-page">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="login-body">
          <h2 className="login-header">Login</h2>
          <hr className="horizontal-line" />
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="icon" htmlFor="username">
                @
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input"
                id="username"
                name="username"
                value={formData.email}
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
              <label className="icon" title="Password" htmlFor="password">
                🗝
              </label>
              <input
                type="password"
                placeholder="password (between 6 - 10 characters)"
                className="input"
                maxLength={10}
                minLength={6}
                id="password"
                name="password"
                value={formData.password}
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
            {message && <p className="error-message">{message}</p>}
            <div className="login-footer">
              <Link to="/signup" className="new-user">
                New to MyFit?
              </Link>
            </div>
          </form>
          <Modal isOpen={isModalOpen} handleClose={handleCloseModal} />
          <LoadingModal isOpen={isLoading} />
        </div>
      </div>
    </section>
  );
}
