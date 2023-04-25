import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Switch, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function Application() {
  const LOCAL_STORAGE_KEY = "contacts";
  // const [contacts, setContacts] = useState([]);

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact}]);
  };

  const removeContactHandler = (id) => {
    console.log(id);
    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    });
    setContacts(newContactList);
  }

  // useEffect(() => {
  //   const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if(retrievedContacts) {
  //     setContacts(retrievedContacts);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/add' component={<AddContact />} exact></Route>
          <Route path='/' element={<ContactList />} exact></Route>
        </Routes>
        {/* <AddContact addContactHandler={addContactHandler}/> */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
      
    </div>
  );
}

export default Application;
