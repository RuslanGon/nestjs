import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../features/users/usersSlice";
import css from "./MainPage.module.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.users);
  console.log(currentUser);

  useEffect(() => {
    if (token && !currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [token, currentUser, dispatch]);

  return (
    <div className={css.background}>
      <div className={css.header}>
        {currentUser ? `Hello, ${currentUser.name}` : "Hello, Guest"}
      </div>
      {/* Здесь остальной контент страницы */}
    </div>
  );
};

export default MainPage;
