import React, { useState } from "react";
import css from "./BloodForm.module.css";

const BloodForm = () => {
  const [form, setForm] = useState({
    hemoglobin: "",
    erythrocytes: "",
    leukocytes: "",
    platelets: "",
    hematocrit: "",
    glucose: "",
    bilirubin: "",
    cholesterol: "",
    protein: "",
    gender: "", // новое поле
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Результати аналізу:", form);
  };

  return (
    <div className={css.container}>
      <div className={css.mainDiv}>
        <h1 className={css.title}>Введіть свої дані аналізу крові</h1>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.grid}>
            <label>
              Гемоглобін (г/л)
              <input
                name="hemoglobin"
                value={form.hemoglobin}
                onChange={handleChange}
                placeholder="135"
                required
              />
            </label>

            <label>
              Еритроцити (×10¹²/л)
              <input
                name="erythrocytes"
                value={form.erythrocytes}
                onChange={handleChange}
                placeholder="4.7"
                required
              />
            </label>

            <label>
              Лейкоцити (×10⁹/л)
              <input
                name="leukocytes"
                value={form.leukocytes}
                onChange={handleChange}
                placeholder="6.5"
                required
              />
            </label>

            <label>
              Тромбоцити (×10⁹/л)
              <input
                name="platelets"
                value={form.platelets}
                onChange={handleChange}
                placeholder="250"
                required
              />
            </label>

            <label>
              Гематокрит (%)
              <input
                name="hematocrit"
                value={form.hematocrit}
                onChange={handleChange}
                placeholder="42"
                required
              />
            </label>

            <label>
              Глюкоза (ммоль/л)
              <input
                name="glucose"
                value={form.glucose}
                onChange={handleChange}
                placeholder="5.1"
                required
              />
            </label>

            <label>
              Білірубін (мкмоль/л)
              <input
                name="bilirubin"
                value={form.bilirubin}
                onChange={handleChange}
                placeholder="14"
                required
              />
            </label>

            <label>
              Холестерин (ммоль/л)
              <input
                name="cholesterol"
                value={form.cholesterol}
                onChange={handleChange}
                placeholder="4.8"
                required
              />
            </label>

            <label>
              Білок загальний (г/л)
              <input
                name="protein"
                value={form.protein}
                onChange={handleChange}
                placeholder="72"
                required
              />
            </label>

            <label className={css.genderGroup}>
              Стать:
              <div className={css.genderRow}>
                <label className={css.genderOption}>
                  <input
                    type="checkbox"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={() => setForm({ ...form, gender: "male" })}
                  />
                  Чоловік
                </label>

                <label className={css.genderOption}>
                  <input
                    type="checkbox"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={() => setForm({ ...form, gender: "female" })}
                  />
                  Жінка
                </label>
              </div>
            </label>
          </div>

          <button type="submit" className={css.submitBtn}>
            Надіслати результат
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodForm;
