import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import css from "./MainPage.module.css";
import BloodForm from "../../components/BloodForm.jsx";

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
      <div className={css.header}>
        <div className={css.rightPanel}>
          {currentUser && (
            <>
            <Link to="/my-room" className={css.text}>Мій кабінет</Link>
              <span className={css.userName}>Hello {currentUser.name}</span>
              <button className={css.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Здесь остальной контент страницы */}
      <BloodForm />
    </div>
  );
};

export default MainPage;
