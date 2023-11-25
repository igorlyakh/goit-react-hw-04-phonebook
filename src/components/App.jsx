import { useState } from 'react';
import { nanoid } from 'nanoid';
import AddContactForm from './AddContactForm';
import ContactsList from './ContactsList';
import FilterField from './FilterField';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  const onNameSubmit = person => {
    const checkContact = contacts.some(
      contact => contact.name.toLowerCase() === person.name.toLowerCase()
    );
    if (checkContact) {
      alert(`${person.name} is already in contacts.`);
      return;
    }
    setContacts(prev => {
      return [...prev, { ...person, id: nanoid() }];
    });
  };

  const onDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const onFilter = value => {
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const visibleContacts = getFilteredContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm onNameSubmit={onNameSubmit} />
      <FilterField contactFilter={filter} onFilter={onFilter} />
      {contacts.length > 0 && (
        <ContactsList contacts={visibleContacts} onDelete={onDelete} />
      )}
    </>
  );
};
