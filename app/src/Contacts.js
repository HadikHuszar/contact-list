import * as React from "react";

import * as apiClient from "./apiClient";

const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);

  const loadContacts = async () => setContacts(await apiClient.getContacts());

  const addContact = (contact) =>
    apiClient.addContact(contact).then(loadContacts);

  React.useEffect(() => {
    loadContacts();
  }, []);

  return (
    <section>
      <span id="list">
        <span id="contactlist-title">CONTACTS</span>
        <ContactList contacts={contacts} />
      </span>
      <h2> Contact List ToolBox</h2>
      <br></br>
      <AddContact {...{ addContact, loadContacts }} />
    </section>
  );
};

const ContactList = ({ contacts }) => (
  <ul>
    {contacts.map(({ id, first_name, last_name, email, phone }) => (
      <li key={id}>
        <span id="list-name">
          {first_name} {last_name}
        </span>
        <br></br>
        <span>{email}</span>
        <br></br>
        {phone}
        <br></br>
        <br></br>
      </li>
    ))}
  </ul>
);

const AddContact = ({ addContact, loadContacts }) => {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNote] = React.useState("");

  const canAdd = last_name && first_name && email && phone && notes;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await addContact({ last_name, first_name, email, phone, notes });
      // await loadContacts();
      // setCommonName("");
      // setScientificName("");
      // setLocation("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Last Name:
        <input
          onChange={(e) => setLastName(e.currentTarget.value)}
          value={last_name}
        />
      </label>
      <br></br>
      <label>
        First Name:
        <input
          onChange={(e) => setFirstName(e.currentTarget.value)}
          value={first_name}
        />
      </label>
      <br></br>
      <label>
        eMail:
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />
      </label>
      <br></br>
      <label>
        Phone#:
        <input
          onChange={(e) => setPhone(e.currentTarget.value)}
          value={phone}
        />
      </label>
      <br></br>
      <label>
        Notes:
        <input onChange={(e) => setNote(e.currentTarget.value)} value={notes} />
      </label>
      <br></br>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Contacts;
