"use client";

import { useContext, useState } from "react";
import "./Login.scss";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookie from "cookie-universal";
import { User } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    emailUniv: "",
    motDePasse: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const user = useContext(User);
  const cookies = Cookie();
  console.log("form data : ", formData);

  console.log(user.auth);

  const handleLoginAdmin = async () => {
    try {
      const res = await axios.post(`${backendUrl}/auth-admin/login`, formData);
      if (res.data) {
        console.log(
          "user : ",
          res.data.data.nom,
          res.data.data.emailUniv,
          res.data.data.role
        );
        cookies.set("token", res.data.token);
        cookies.set("role", res.data.data.role);
        user.setAuth({
          token: res.data.token,
          nom: res.data.data.nom,
          emailUniv: res.data.data.emailUniv,
          role: res.data.data.role,
        });
        navigate("/home");
      }
    } catch (error) {
      setAuthErr(true);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(isSignUp ? "Sign up attempt:" : "Sign in attempt:", formData);
      setIsLoading(false);
    }, 1500);

    await handleLoginAdmin();
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ emailUniv: "", motDePasse: "" });
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="login">
      <div className="login__container">
        {/* Left Panel - Welcome Section */}
        <div className="login__welcome-panel">
          <img src="/images/4-UN (1).jpg" alt="" />
        </div>

        {/* Right Panel - Form Section */}
        <div className="login__form-panel">
          <div className="login__form-content">
            <h2 className="login__form-title">
              {isSignUp ? "Create Account" : "Sign In"}
            </h2>

            {/* Form */}
            <form className="login__form" onSubmit={handleSubmit}>
              <div className="login__input-group">
                <input
                  type="email"
                  name="emailUniv"
                  placeholder="Email Universitaire"
                  value={formData.emailUniv}
                  onChange={handleInputChange}
                  className="login__input"
                  required
                  autoComplete="emailUniv"
                />
              </div>

              <div className="login__input-group">
                <input
                  type="password"
                  name="motDePasse"
                  placeholder="Password"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  className="login__input"
                  required
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
              </div>

              <button
                type="submit"
                className={`login__submit-btn ${
                  isLoading ? "login__submit-btn--loading" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="login__spinner"></div>
                ) : isSignUp ? (
                  "SIGN UP"
                ) : (
                  "SIGN IN"
                )}
              </button>
              {authErr && (
                <p
                  style={{
                    marginTop: "5px",
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: "#ef4444"
                  }}
                >
                  Email Universitaire ou Password incorrect
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
