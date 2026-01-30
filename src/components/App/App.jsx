import { useEffect, useState } from "react";
import css from "./App.module.css";

import ContactsForm from "../ContactsForm/ContactsForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

export default function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.body.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className={css.page}>
      <div className={css.card}>
        {/* 🔹 HEADER З ПЕРЕМИКАЧЕМ ТЕМИ */}
        <div className={css.header}>
          <h1 className={css.title}>Phonebook</h1>

          <button
            className={css.themeToggle}
            onClick={() => setDark((prev) => !prev)}
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <p className={css.subtitle}>Your personal contact manager</p>

        <ContactsForm />
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
}
