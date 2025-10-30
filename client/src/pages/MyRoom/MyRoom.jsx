import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import css from "./MyRoom.module.css";

export const MyRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const lastPost = useSelector((state) => state.posts.lastPost);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!lastPost) return <div className={css.noData}>Немає останніх даних</div>;

  return (
    <div className={css.container}>
      {/* Хедер */}
      <div className={css.header}>
        <div className={css.rightPanel}>
          {currentUser && (
            <>
              <Link to="/my-room" className={css.text1}>Мій кабінет</Link>
              <Link to="/main" className={css.text1}>Форма запису</Link>
              <span className={css.userName}>Hello {currentUser.name}</span>
              <button className={css.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Основной контент */}
      <div className={css.mainDiv}>
        <h2 className={css.title}>Ваш останній аналіз крові</h2>
        <p className={css.date}>Дата відправки: {lastPost.date}</p>

        <form className={css.form}>
          <div className={css.grid}>
            {Object.keys(lastPost).map((key) =>
              key !== "id" && key !== "author" && key !== "date" ? (
                <label key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <input type="text" value={lastPost[key]} readOnly />
                </label>
              ) : null
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
