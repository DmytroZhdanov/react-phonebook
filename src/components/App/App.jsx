import { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container, Title1, Title2 } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = newContact => {
    const matchedContact = this.state.contacts.find(
      ({ name }) => name === newContact.name
    );
    if (matchedContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      const contactsArr = [...prevState.contacts];
      contactsArr.push(newContact);
      return { contacts: contactsArr };
    });
  };

  filterHandler = filterQuery => {
    this.setState({ filter: filterQuery });
  };

  contactDeleteHandler = nameToDelete => {
    this.setState(prevState => {
      const newContactsArr = [...prevState.contacts].filter(
        ({ name }) => name !== nameToDelete
      );
      return { contacts: newContactsArr };
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <Container>
        <Title1>Phonebook</Title1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Title2>Contacts</Title2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter filter={this.state.filter} onChange={this.filterHandler} />
            {filteredContacts.length > 0 ? (
              <ContactList
                contacts={filteredContacts}
                onDeleteContact={this.contactDeleteHandler}
              />
            ) : (
              <p>Sorry, we didn't find any contacts matching your query</p>
            )}
          </>
        ) : (
          <p>You don't have any contacts yet</p>
        )}
      </Container>
    );
  }
}
