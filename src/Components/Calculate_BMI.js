import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <style jsx>
        {`
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
        `}
      </style>
    </div>
  );
};

export default function Calculate_BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [weightGoal, setWeightGoal] = useState("");
  const [calories, setCalories] = useState(null);
  const [goalType, setGoalType] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [user, setData] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Load user details from localStorage when the app is initialized
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("access_token");
      const name = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const isPremiumUser = localStorage.getItem("ispremiumuser");
      setUsername(localStorage.getItem("username"));

      if (token && name) {
        setData({ username: name, email, isPremiumUser });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setHasCheckedAuth(true);
    };
    checkAuthentication();
  }, []);
  useEffect(() => {
    if (hasCheckedAuth && !isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [hasCheckedAuth, isAuthenticated]);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  if (!hasCheckedAuth) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
        }}
      >
        <div
          style={{
            border: "8px solid rgba(255, 255, 255, 0.2)",
            borderTop: "8px solid #ff0000",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p
          style={{
            marginTop: "10px",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Loading...
        </p>
        <style>
          {`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
        </style>
      </div>
    );
  }

  // If not authenticated, don't render the calculator

  function handleVegOnlyChange(e) {
    setVegOnly(e.target.checked);
  }

  function calculateBMI(e) {
    e.preventDefault();

    if (height === "" || weight === "") {
      setMessage("Please fill in all values.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      const cm = height / 100;
      const kg = weight;
      const bmiValue = Math.round(kg / (cm * cm));

      setBmi(bmiValue);

      let categoryValue = "";
      if (bmiValue < 18.5) {
        categoryValue = "Underweight";
        // setMessage(
        //   `Your BMI is ${bmiValue}, and you are underweight. Consider gaining weight.`
        // );
      } else if (bmiValue < 25) {
        categoryValue = "Healthy";
        // setMessage(`Your BMI is ${bmiValue}, and you are healthy.`);
      } else if (bmiValue < 30) {
        categoryValue = "Overweight";
        // setMessage(
        //   `Your BMI is ${bmiValue}, and you are overweight. Consider losing weight.`
        // );
      } else {
        categoryValue = "Obese";
        // setMessage(
        //   `Your BMI is ${bmiValue}, and you are obese. Consider losing weight.`
        // );
      }

      setCategory(categoryValue);
      calculateBMR();
    }
    if (!gender) {
      setMessage("Please select gender.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return; // stop execution if gender is not selected
    }
  }

  function calculateBMR() {
    let bmrValue;
    if (!gender) {
      return; // stop if gender is not selected
    }
    if (gender === "male") {
      bmrValue = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmrValue = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    setBmr(bmrValue.toFixed(2));
  }

  function calculateCalories(goalType) {
    // if (!weightGoal || weightGoal <= 0) {
    //   setMessage("Please enter a valid weight goal.");
    //   return;
    // }

    let calorieAdjustment = 0;

    if (goalType === "loss") {
      calorieAdjustment = -((weightGoal * 7700) / 30); // Weight loss in kg -> calorie deficit
      if (calorieAdjustment < -1000) calorieAdjustment = -1000; // Max safe deficit
      if (calorieAdjustment > -500) calorieAdjustment = -500; // Min effective deficit
    } else if (goalType === "gain") {
      calorieAdjustment = (weightGoal * 7700) / 30; // Weight gain in kg -> calorie surplus
      if (calorieAdjustment > 1000) calorieAdjustment = 1000; // Max safe surplus
      if (calorieAdjustment < 500) calorieAdjustment = 500; // Min effective surplus
    }

    const dailyCalories = (bmr * activityLevel + calorieAdjustment).toFixed(2);
    setCalories(dailyCalories);
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        title="Authentication Required"
        message="You need to login to use this functionality. Would you like to go to the login page?"
        buttonText="Login"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
      <div className="bmi-calculator-container">
        <div className="bmi-calculator-card">
          <h1 className="bmi-calculator-title">
            <span className="text-red">BMI </span>
            <span className="text-gray">CALCULATOR</span>
          </h1>
          <form onSubmit={calculateBMI} className="bmi-calculator-form">
            <div className="input-group">
              <input
                type="number"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bmi-input"
              />
              <span className="input-label">Cm</span>
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bmi-input"
              />
              <span className="input-label">Years</span>
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bmi-input"
              />
              <span className="input-label">Kg</span>
            </div>
            <div></div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bmi-select"
            >
              {gender === "" && (
                <option value="" disabled>
                  Select Gender
                </option>
              )}
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="bmi-select"
            >
              <option value="1.2">Sedentary (little or no exercise)</option>
              <option value="1.375">
                Lightly active (light exercise/sports)
              </option>
              <option value="1.55">
                Moderately active (moderate exercise/sports)
              </option>
              <option value="1.725">Very active (hard exercise/sports)</option>
              <option value="1.9">
                Super active (very hard exercise/sports)
              </option>
            </select>
            <div
              className="radio-group"
              style={{ gridColumn: "1 / -1", marginTop: "20px" }}
            >
              <label className="radio-label">
                <input
                  type="radio"
                  id="nonVeg"
                  name="mealType"
                  defaultChecked
                />
                <span className="radio-custom"></span>
                Veg / Non Veg
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  id="vegOnly"
                  name="mealType"
                  checked={vegOnly}
                  onChange={handleVegOnlyChange}
                />
                <span className="radio-custom"></span>
                Vegeterian Only
              </label>
            </div>

            <button type="submit" className="bmi-submit-button">
              Calculate Now →
            </button>
          </form>
          <p className="bmi-message">{message}</p>
          {bmr && (
            <div className="results-container">
              <h2 className="results-title">RESULTS</h2>
              <div className="results-grid">
                <div className="result-item">
                  <h3 className="result-label">BMI</h3>
                  <p className="result-value">{bmi}</p>
                </div>
                <div className="result-item">
                  <h3 className="result-label">BMR</h3>
                  <p className="result-value">{bmr} kcal/day</p>
                </div>
                <div className="result-item">
                  <h3 className="result-label">Category</h3>
                  <p className="result-value">{category}</p>
                </div>
              </div>
              {(category === "Overweight" ||
                category === "Obese" ||
                category === "Underweight" ||
                category === "Healthy") && (
                <div>
                  <div className="weight-goal-container">
                    <input
                      type="number"
                      placeholder={`Weight Goal (${
                        category === "Underweight" ? "gain" : "loss"
                      } in kg)`}
                      value={weightGoal}
                      onChange={(e) => setWeightGoal(e.target.value)}
                      className="weight-goal-input"
                    />
                    <div className="weight-goal-buttons">
                      {category === "Healthy" && (
                        <>
                          <button
                            className="weight-goal-button"
                            onClick={() => {
                              setGoalType("loss");
                              calculateCalories("loss");
                            }}
                          >
                            Weight Loss →
                          </button>
                          <button
                            className="weight-goal-button"
                            onClick={() => {
                              setGoalType("gain");
                              calculateCalories("gain");
                            }}
                          >
                            Weight Gain →
                          </button>
                        </>
                      )}
                      {(category === "Overweight" ||
                        category === "Obese" ||
                        category === "Underweight") && (
                        <button
                          className="weight-goal-button"
                          onClick={() => {
                            setGoalType(
                              category === "Underweight" ? "gain" : "loss"
                            );
                            calculateCalories(
                              category === "Underweight" ? "gain" : "loss"
                            );
                          }}
                        >
                          {category === "Underweight"
                            ? "Weight Gain"
                            : "Weight Loss"}{" "}
                          →
                        </button>
                      )}
                    </div>
                    {calories && (
                      <div className="results-container">
                        <div className="results-grid">
                          <div className="result-item">
                            <h4 className="result-label">
                              Daily Calories for {goalType}
                            </h4>
                            <p className="result-value">{calories} kcal</p>
                          </div>
                        </div>
                        <div className="weight-goal-buttons">
                          <Link
                            to="/diet"
                            className="weight-goal-button"
                            onClick={() => {
                              localStorage.setItem("bmi", bmi);
                              localStorage.setItem("bmr", bmr);
                              localStorage.setItem("calories", calories);
                              localStorage.setItem("vegOnly", vegOnly);
                            }}
                          >
                            Get your customised diet Plan →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          ;
        </div>

        <style jsx>{`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }

          .bmi-calculator-container {
            min-height: 100vh;
            background-color: var(--black);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: Arial, sans-serif;
          }

          .bmi-calculator-card {
            width: 100%;
            max-width: 120rem;
            background-color: var(--black);
            border-radius: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
          }

          .bmi-calculator-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2rem;
          }

          .text-gray {
            color: var(--white);
            font-size: 3rem;
          }

          .text-red {
            color: var(--red);
            font-size: 3rem;
          }

          .bmi-calculator-form {
            display: flex;
            flex-direction: column;
            gap: 1.7rem;
          }

          .input-group {
            position: relative;
          }

          .bmi-input,
          .bmi-select {
            width: 100%;
            height: 5rem;
            background-color: #2e3649;
            color: #ffffff;
            padding: 1rem 1.7rem;
            border: none;
            border-radius: 1rem;
            font-size: 2rem;
          }

          .input-label {
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            font-size: 1.5rem;
          }

          .bmi-submit-button {
            background-color: var(--red);
            color: var(--white);
            padding: 1.7rem;
            border: none;
            border-radius: 1rem;
            font-size: 2rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
            margin-top: 1rem;
          }

          .bmi-submit-button:hover {
            background-color: var(--red);
            transform: scale(1.05);
          }

          .bmi-message {
            color: var(--white);
            text-align: center;
            margin-top: 1.5rem;
            font-size: 2rem;
          }

          .results-container {
            margin-top: 3rem;
            background-color: var(--black);
            padding: 2rem;
            border-radius: 0.75rem;
          }

          .results-title {
            font-size: 2.5rem;
            color: var(--red);
            text-align: left;
            margin-bottom: 1.5rem;
          }

          .results-grid {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .result-item {
            background-color: #1e2130;
            padding: 1.5rem;
            border-radius: 0.5rem;
          }

          .full-width {
            width: 100%;
          }

          .result-label {
            font-size: 2rem;
            color: var(--red);
            margin-bottom: 0.75rem;
          }

          .result-value {
            font-size: 1.7rem;
            font-weight: 600;
            color: #ffffff;
          }

          .weight-goal-container {
            margin-top: 4rem;
          }

          .weight-goal-input {
            width: 100%;
            background-color: #1e2130;
            color: #ffffff;
            padding: 1rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.7rem;
            margin-bottom: 3rem;
          }

          .weight-goal-buttons {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .weight-goal-button {
            background-color: var(--red);
            color: #ffffff;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.8rem;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .weight-goal-button:hover {
            background-color: var(--red);
            transform: scale(1.05);
          }

          .adjusted-plan {
            margin-top: 3rem;
            background-color: #1e2130;
            padding: 2rem;
            border-radius: 0.75rem;
          }

          .adjusted-plan-title {
            font-size: 2.5rem;
            color: var(--red);
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .adjusted-plan-grid {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .adjusted-plan-label {
            font-size: 1.7rem;
            color: var(--red);
            margin-bottom: 0.5rem;
          }

          .adjusted-plan-value {
            font-size: 1.7rem;
            font-weight: bold;
            color: #ffffff;
          }

          .radio-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .radio-label {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            color: var(--white);
            font-size: 16px;
            cursor: pointer;
          }

          .radio-label input[type="radio"] {
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }

          .radio-custom {
            width: 20px;
            height: 20px;
            border: 2px solid var(--white);
            border-radius: 50%;
            margin-right: 10px;
            display: inline-block;
            position: relative;
          }

          .radio-label input[type="radio"]:checked + .radio-custom::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--red);
          }

          @media (min-width: 768px) {
            .bmi-calculator-container {
              padding: 10rem;
            }

            .bmi-calculator-card {
              padding: 3rem;
            }

            .bmi-calculator-form {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }

            .bmi-submit-button {
              grid-column: span 2;
            }

            .results-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
            }

            .weight-goal-buttons {
              flex-direction: row;
              justify-content: left;
            }

            .adjusted-plan-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
            }

            .radio-group {
              flex-direction: row;
              align-items: center;
            }

            .radio-label {
              margin-right: 20px;
              margin-bottom: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
