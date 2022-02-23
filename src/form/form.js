import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { ContactForm, Label, Tel, Name, Btn } from "./form.styled";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const hanldeChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;

      case "number":
        setNumber(e.target.value);
        break;

      default:
        return;
    }
  };

  const setForm = (e) => {
    e.preventDefault();

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    onSubmit(contact);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setNumber("");
  };

  return (
    <ContactForm onSubmit={setForm}>
      <Label htmlFor="name">
        {" "}
        Name
        <Name
          type="text"
          name="name"
          value={name}
          onChange={hanldeChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например drian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </Label>
      <Label htmlFor="number">
        Telephone
        <Tel
          type="tel"
          name="number"
          value={number}
          onChange={hanldeChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </Label>
      <Btn type="submit">Add contact</Btn>
    </ContactForm>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
