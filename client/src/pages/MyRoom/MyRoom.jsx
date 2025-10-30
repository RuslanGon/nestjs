import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import css from "./MyRoom.module.css";

export const MyRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const lastPost = useSelector((state) => state.posts.lastPost);

  // Логируем lastPost для проверки
  useEffect(() => {
    console.log("lastPost из Redux:", lastPost);
  }, [lastPost]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!lastPost) {
    return <div className={css.noData}>Немає останніх даних</div>;
  }

  // Красивые подписи для полей
  const fieldLabels = {
    hemoglobin: "Гемоглобін (г/л)",
    erythrocytes: "Еритроцити (×10¹²/л)",
    leukocytes: "Лейкоцити (×10⁹/л)",
    platelets: "Тромбоцити (×10⁹/л)",
    hematocrit: "Гематокрит (%)",
    glucose: "Глюкоза (ммоль/л)",
    bilirubin: "Білірубін (мкмоль/л)",
    cholesterol: "Холестерин (ммоль/л)",
    protein: "Білок загальний (г/л)",
    gender: "Стать",
  };

  // Форматируем дату для отображения
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={css.container}>
      {/* Хедер */}
      <div className={css.header}>
        <div className={css.rightPanel}>
          {currentUser && (
            <>
              <Link to="/my-room" className={css.text1}>
                Мій кабінет
              </Link>
              <Link to="/main" className={css.text1}>
              Кабінет запису
              </Link>
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
        {/* Дата и время сверху */}
        <p className={css.date}>Дата відправки: {formatDate(lastPost.date)}</p>

        <form className={css.form}>
          <div className={css.grid}>
            {Object.entries(lastPost).map(([key, value]) => {
              // Исключаем поля, которые не нужно отображать, включая дату
              if (["id", "author", "date"].includes(key)) return null;

              return (
                <label key={key}>
                  {fieldLabels[key] || key}
                  <input type="text" value={value} readOnly />
                </label>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};
