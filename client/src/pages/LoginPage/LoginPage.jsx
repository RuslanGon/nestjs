import React from "react";
import { Link } from 'react-router-dom';
import google from '../../assets/google.svg'; 
import link from '../../assets/link.svg'; 
import face from '../../assets/face.svg'; 
import css from './LoginPage.module.css'


const LoginPage = () => {
  return (
    <div className={css.container}>
      <div className={css.mainDiv}>
        <h1 className={css.title}>Your SmartLab AI</h1>
        <form>
          <h2>Login</h2>
          <label>
            Email
            <input type="email" placeholder="username@gmail.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>
          <button type="button">Login</button>

          <p>or continue with</p>
          <div className={css.socialButtons}>
            <button><img src={google} alt="google" /></button>
            <button><img src={link} alt="link" /></button>
            <button><img src={face} alt="face" /></button>
          </div>

          <p>
            Don’t have an account yet? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
