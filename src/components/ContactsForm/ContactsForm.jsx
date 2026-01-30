import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";
import { useState } from "react";
import css from "./ContactsForm.module.css";

export default function ContactsForm() {
  const dispatch = useDispatch();

  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const handleNumberChange = (e) => {
    let value = e.target.value;

    // 🔁 replace leading 00 with +
    if (value.startsWith("00")) {
      value = "+" + value.slice(2);
    }

    // ❌ allow only digits and +
    if (!/^[0-9+]*$/.test(value)) {
      setError("Only digits and + are allowed");
      return;
    }

    // ❌ + only at the beginning
    if (value.includes("+") && !value.startsWith("+")) {
      setError("The + sign must be at the beginning");
      return;
    }

    // ❌ max length 14 characters
    if (value.length > 14) {
      setError("Phone number must be up to 14 characters");
      return;
    }

    setError("");
    setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value.trim();

    if (!name || !number) {
      setError("Please enter a valid phone number");
      return;
    }

    dispatch(
      addContact({
        id: nanoid(),
        name,
        number,
      }),
    );

    e.target.reset();
    setNumber("");
    setError("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input className={css.input} name="name" placeholder="Full Name" required />

      <input
        className={css.input}
        name="number"
        placeholder="+491234567890"
        value={number}
        onChange={handleNumberChange}
      />

      {error && <p className={css.error}>{error}</p>}

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
