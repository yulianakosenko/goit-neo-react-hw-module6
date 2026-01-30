import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  if (filteredContacts.length === 0) {
    return <p className={css.empty}>No contacts found ✨</p>;
  }

  // 🔤 group by first letter
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const letter = contact.name[0].toUpperCase();

    if (!groups[letter]) {
      groups[letter] = [];
    }

    groups[letter].push(contact);
    return groups;
  }, {});

  return (
    <div className={css.wrapper}>
      {Object.entries(groupedContacts).map(([letter, contacts]) => (
        <div key={letter} className={css.section}>
          <p className={css.letter}>{letter}</p>

          <ul className={css.list}>
            {contacts.map((contact) => (
              <Contact key={contact.id} contact={contact} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
