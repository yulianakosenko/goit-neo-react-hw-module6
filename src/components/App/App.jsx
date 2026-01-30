import css from "./App.module.css";
import ContactsForm from "../ContactsForm/ContactsForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

export default function App() {
  return (
    <div className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>Phonebook</h1>
        <p className={css.subtitle}>Your personal contact manager</p>

        <ContactsForm />
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
}
