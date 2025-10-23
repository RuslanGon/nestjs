import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setCurrentUser } from "../../features/users/usersSlice";
import google from "../../assets/google.svg";
import link from "../../assets/link.svg";
import face from "../../assets/face.svg";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, currentUser } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // диспатчим логин
    const resultAction = await dispatch(loginUser(formData));

    // если login успешен, resultAction.payload содержит { access_token, user }
    if (loginUser.fulfilled.match(resultAction)) {
      // сохраняем текущего пользователя
      dispatch(setCurrentUser(resultAction.payload.user));
      // переходим на main
      navigate("/main");
    }
  };

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
