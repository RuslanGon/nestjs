import React from "react"; 
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.jpg"; 
import google from '../../assets/google.svg'; 
import link from '../../assets/link.svg'; 
import face from '../../assets/face.svg'; 
import css from './RegisterPage.module.css'; 

const RegisterPage = () => { 
  return (
    <div className={css.container}> 
      <div className={css.mainDiv}> 
        <h1 className={css.title}>Your SmartLab AI</h1> 
        <form> 
          <h2>Register</h2> 
          <label> 
            Name
            <input type="text" placeholder="Name" /> 
          </label> 
          <label> 
            Email
            <input type="email" placeholder="username@gmail.com" /> 
          </label> 
          <label> 
            Password
            <input type="password" placeholder="Password" /> 
          </label> 
          <button type="button">Sign Up</button> 

          <p>or continue with</p> 
          <div className={css.socialButtons}> 
            <button type="button"><img src={google} alt="google" /></button> 
            <button type="button"><img src={link} alt="link" /></button> 
            <button type="button"><img src={face} alt="face" /></button> 
          </div> 

          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p> 
        </form> 
      </div> 
    </div>
  ); 
}; 

export default RegisterPage;
