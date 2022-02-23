import { useState, useEffect } from "react";
import "./App.css";
import Form from "./form/index";
import Filter from "./filter/index";
import ContactList from "./contactList/index";

export default function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    JSON.parse(window.localStorage.getItem("contacts"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    const foundName = contacts.find(({ name }) => name === contact.name);
    const foundNumber = contacts.find(
      ({ number }) => number === contact.number
    );

    if (foundName) {
      alert(`${contact.name} is already on contacts`);
      return;
    } else if (foundNumber) {
      alert(`${contact.number} is already on contacts`);
      return;
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const handleChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  const handleRemove = (id) => {
    setContacts((prev) => prev.filter((el) => el.id !== id));
  };

  const filterRegister = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterRegister)
  );
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Phonebook</h1>

      <Form onSubmit={addContact} />

      <h2 style={{ textAlign: "center" }}>Contacts</h2>
      <Filter value={filter} onChange={handleChange} />

      <ContactList contactsList={filteredContacts} onRemove={handleRemove} />
    </>
  );
}
