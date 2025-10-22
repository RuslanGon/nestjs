import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/users/usersSlice";
import google from "../../assets/google.svg";
import link from "../../assets/link.svg";
import face from "../../assets/face.svg";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate("/main"); 
    }
  }, [token, navigate]);

  return (
    <div className={css.container}>
      <div className={css.mainDiv}>
        <h1 className={css.title}>Your SmartLab AI</h1>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className={css.signUpBtn}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <p>or continue with</p>
          <div className={css.socialButtons}>
            <button type="button"><img src={google} alt="google" /></button>
            <button type="button"><img src={link} alt="link" /></button>
            <button type="button"><img src={face} alt="face" /></button>
          </div>

          <p>
            Don’t have an account yet?{" "}
            <Link to="/register" style={{ color: "#fcf0a1", textDecoration: "underline" }}>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
