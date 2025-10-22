import React from 'react';
import { useSelector } from 'react-redux';
import css from './MainPage.module.css';

const MainPage = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  console.log(currentUser);

  return (
    <div className={css.background}>
      <div className={css.header}>
        {currentUser ? `Hello, ${currentUser.name}` : 'Hello, Guest'}
      </div>
      {/* Можно добавить сюда остальной контент страницы */}
    </div>
  );
};

export default MainPage;
