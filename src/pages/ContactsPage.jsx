import React from 'react';
import app from '../components/App.module.css';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';

const ContactsPage = () => {
  return (
    <div className={app.block}>
      <h2 className={app.firstTitle}>Phonebook</h2>
      <ContactForm />
      <h2 className={app.secondTitle}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
