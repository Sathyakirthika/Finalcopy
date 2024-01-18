import React, { useState, useEffect } from "react";
import '../styles/billing.css';

const FloatingAlert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setIsLoading(type === "success");

      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsLoading(false);

        if (type === "success") {
          const successTimer = setTimeout(() => {
            setIsVisible(false);
          }, 2000);

          return () => clearTimeout(successTimer);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, type]);

  const alertStyle = {
    position: "fixed",
    top: "10px",
    left: "60%",
    transform: "translateX(-50%)",
    borderRadius: "5px",
    boxShadow: isVisible ? "0px 2px 5px rgba(0, 0, 0, 0.2)" : "none",
    zIndex: "9999",
    display: "block",
    width: "300px",
    textAlign: "center",
    padding: "10px",
    transition: "background-color 0.3s, color 0.3s",
    backgroundColor: isVisible ? (type === "success" ? "green" : "red") : "transparent",
    color: isVisible ? "white" : "transparent",
  };

  return (
    <div className={`floating-alert${isVisible ? " show" : ""}`} style={alertStyle}>
    {isLoading ? (
      <div>
        <span>Loading... </span>
        <div className="spinner"></div>
      </div>
    ) : (
      message
    )}
  </div>
  );
};

export default FloatingAlert;
