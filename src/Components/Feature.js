import React from "react";
import "../style1.css";

const tiers = [
  {
    name: "HEALTH",
    image: "/images/feature1.jpg",
    features: [
      "Calculations of BMI, BMR",
      "Calorie Calculation",
      "Premium Diet",
    ],
    color: "var(--red)",
  },
  {
    name: "DIET",
    image: "/images/feature2.png",
    features: [
      "Premium feature",
      "Diet customised based on your calories intake",
      "Any-time diet customisation",
    ],
    color: "var(--red)",
  },
  {
    name: "WORKOUT",
    image: "/images/feature3.jpg",
    features: [
      "At home workouts",
      "Workouts curated for all body parts",
      "Goal-based Workouts",
    ],
    color: "var(--red)",
  },
];

export default function Feature() {
  return (
    <section className="membership-tiers">
      <div className="tier-container">
        {tiers.map((tier, index) => (
          <div key={index} className="tier-card">
            <div className="image-container">
              <img
                src={tier.image}
                alt={`${tier.name} workout`}
                className="tier-image"
              />
            </div>
            <div className="tier-content">
              <h2 style={{ color: tier.color }}>{tier.name}</h2>
              <p className="access-text">Unlimited Access To</p>
              <ul>
                {tier.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="button-container">
                <button className="btn-try">TRY FOR FREE</button>
                <button className="btn-learn">GET PREMIUM</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
