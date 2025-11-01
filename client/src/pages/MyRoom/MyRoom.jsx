import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from "../../features/posts/postsSlice";
import { logout } from "../../features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import css from "./MyRoom.module.css";

export const MyRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchPosts());
    }
  }, [dispatch, currentUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // 🔹 Фильтруем посты текущего пользователя
  const userPosts = posts.filter(
    (post) => post.author?._id === currentUser?._id
  );

  // 🔹 Логи для отладки
  console.log("Current user:", currentUser);
  console.log("All posts:", posts);
  console.log("Filtered posts:", userPosts);

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

  const handleDelete = (id) => {
    console.log("Deleting post with id:", id);
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        console.log("Post deleted:", id);
      })
      .catch((err) => {
        console.error("Failed to delete post:", err);
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
      {userPosts.length === 0 ? (
        <div className={css.noData}>Немає даних</div>
      ) : (
        <div className={css.cardsWrapper}>
          {userPosts.map((post) => {
            const postDate = post.createdAt ? new Date(post.createdAt) : null;
            console.log("Raw date for post:", post.createdAt);

            return (
              <div key={post.id || post._id} className={css.mainDiv}>
                <h2 className={css.title}>Ваші аналізи крові</h2>
                <p className={css.date}>
                  Дата відправки:{" "}
                  {postDate
                    ? postDate.toLocaleString("uk-UA", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Немає дати"}
                </p>

                <div className={css.grid}>
  {Object.entries(post).map(([key, value]) => {
    if (
      ["id", "_id", "author", "createdAt", "updatedAt", "date"].includes(
        key
      )
    )
      return null;
    return (
      <label key={key}>
        {fieldLabels[key] || key}
        <input type="text" value={value} readOnly />
      </label>
    );
  })}
</div>

                {/* Кнопка удаления */}
                <button
                  className={css.deleteBtn}
                  onClick={() => handleDelete(post._id || post.id)}
                >
                  🗑️ Видалити
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
