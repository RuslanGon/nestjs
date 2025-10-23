import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import css from "./MainPage.module.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  console.log("currentUser:", currentUser);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={css.background}>
      {/* Верхний прозрачный хедер */}
      <div className={css.header}>
        <div className={css.rightPanel}>
          {currentUser && (
            <>
              <span className={css.userName}>Hello {currentUser.name}</span>
              <button className={css.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Здесь остальной контент страницы */}
    </div>
  );
};

export default MainPage;
