import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Layout } from './Layout';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { ContactList } from './Contacts/ContactList';
import { GlobalStyle } from './GlobalStyle';
import initialContacts from '../data.json';

const STORAGE_KEY = 'contacts';

const getInitialContacts = () => {
  const savedContacts = window.localStorage.getItem(STORAGE_KEY);
  return savedContacts !== null ? JSON.parse(savedContacts) : initialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, steFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const findContacts = value => {
    steFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(item => item.id !== contactId)
    );
  };

  const addContact = newContact => {
    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim()
      )
    ) {
      alert(`${newContact.name} is alredy in contacts`);
      return;
    }
    const contact = {
      ...newContact,
      id: nanoid(),
    };
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const visibleContacts = contacts.filter(({ name }) => {
    const hasName = name.toLowerCase().includes(filter.toLowerCase());
    return hasName;
  });
  return (
    <Layout>
      <PhonebookForm onAdd={addContact} />
      <div>
        <h2>Contacts</h2>
        <ContactList
          items={visibleContacts}
          onDelete={deleteContact}
          filter={filter}
          onFindContacts={findContacts}
        />
      </div>
      <GlobalStyle />
    </Layout>
  );
};
// }
