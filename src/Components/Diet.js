import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, message, title, buttonText, onConfirm, onCancel }) => {
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
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onConfirm}>
          {buttonText}
        </button>
        <button className="modal-button" onClick={onCancel}>
          cancel
        </button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .modal-content {
          background: linear-gradient(135deg, black, #34495e);
          color: var(--white);
          width: 90%;
          max-width: 400px;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          text-align: center;
          animation: modalPop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        @keyframes modalPop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background-color: var(--red);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(255, 59, 48, 0.4);
        }

        .modal-icon svg {
          width: 50px;
          height: 50px;
          fill: var(--white);
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(to right, #ff3b30, #ff0101);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .modal-message {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 30px;
          color: #ecf0f1;
        }

        .modal-button {
          padding: 12px 30px;
          background: linear-gradient(to right, #ff3b30, #f00);
          color: var(--white);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(255, 59, 48, 0.4);
        }

        .modal-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255, 59, 48, 0.6);
        }

        .modal-button:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(255, 59, 48, 0.4);
        }
      `}</style>
    </div>
  );
};

export default function Diet() {
  const bmi = localStorage.getItem("bmi");
  const bmr = localStorage.getItem("bmr");
  const calories = localStorage.getItem("calories");
  const [user, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("access_token");
      const name = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const isPremiumUser = localStorage.getItem("isPremiumUser");
      setUsername(name);

      if (token && name) {
        setData({ username: name, email, isPremiumUser });
        setIsAuthenticated(true);
        console.log(isPremiumUser);
        // Check if user is premium and redirect accordingly
        if (isPremiumUser === "true") {
          navigate("/predict");
        } else {
          navigate("/payment");
        }
      } else {
        setIsAuthenticated(false);
        setIsModalOpen(true); // Added this line to show modal when not authenticated
      }
      setHasCheckedAuth(true);
    };
    checkAuthentication();
  }, [navigate]);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  if (!hasCheckedAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="Authentication Required"
        message="You need to login to use this functionality. Would you like to go to the login page?"
        buttonText="Login"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
      {isAuthenticated && (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 style={{ color: "white" }}>Diet</h1>
        </>
      )}
    </>
  );
}
