import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/users/usersSlice";
import google from "../../assets/google.svg";
import link from "../../assets/link.svg";
import face from "../../assets/face.svg";
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(resultAction)) {
      setSuccess(true); // показываем сообщение об успехе
      setFormData({ name: "", email: "", password: "" }); // очищаем поля
      navigate("/login");
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.mainDiv}>
        <h1 className={css.title}>Your SmartLab AI</h1>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

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
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {success && (
            <p style={{ color: "lightgreen", textAlign: "center" }}>
              ✅ User registered successfully!
            </p>
          )}

          <p>or continue with</p>

          <div className={css.socialButtons}>
            <button type="button">
              <img src={google} alt="google" />
            </button>
            <button type="button">
              <img src={link} alt="link" />
            </button>
            <button type="button">
              <img src={face} alt="face" />
            </button>
          </div>

          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#fcf0a1", textDecoration: "underline" }}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
