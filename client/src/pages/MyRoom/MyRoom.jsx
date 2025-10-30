import React from 'react';
import css from './MyRoom.module.css';
import BloodForm from '../../components/BloodForm.jsx';


export const MyRoom = () => {
  return (
    <div className={css.myroom}>
      <BloodForm />
    </div>
  );
};
