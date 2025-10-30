import React from "react";
import { useSelector } from "react-redux";
import css from "./MyRoom.module.css";

export const MyRoom = () => {
  const lastPost = useSelector((state) => state.posts.lastPost);

  if (!lastPost)
    return <div className={css.noData}>Немає останніх даних</div>;

  return (
    <div className={css.container}>
      <div className={css.mainDiv}>
        <h2 className={css.title}>Ваш останній аналіз крові</h2>
        <form className={css.form}>
          <div className={css.grid}>
            {Object.keys(lastPost).map(
              (key) =>
                key !== "id" &&
                key !== "author" && (
                  <label key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <input type="text" value={lastPost[key]} readOnly />
                  </label>
                )
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
