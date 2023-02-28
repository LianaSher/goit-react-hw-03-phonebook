import { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from 'GlobalStales';

import { Filter } from '../components/Filter/Filter';
import { Contacts } from '../components/Contacts/Contacts';
import { Form } from './Form/Form';

import { Container, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('myContacts'));

  //   if (contacts && contacts.length) {
  //     this.setState({ contacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { contacts } = this.state;

  //   if (prevState.contacts.length !== contacts.length) {
  //     localStorage.setItem('myContacts', JSON.stringify(contacts));
  //   }
  // }

  addContactToState = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      if (this.isContactExist(name)) {
        return alert(`${name} is already in Contacts`);
      }
      const newContact = { name, id: nanoid(), number };
      return { contacts: [newContact, ...contacts] };
    });
  };

  isContactExist = newName => {
    const { contacts } = this.state;
    return contacts.find(({ name }) => {
      return name.toLowerCase() === newName.toLowerCase();
    });
  };

  removeContact = idForDelete => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(({ id }) => id !== idForDelete);
      return { contacts: newContacts };
    });
  };

  filterNames = () => {
    const { contacts, filter } = this.state;
    if (!filter) return contacts;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  filterHandle = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const filtredContacts = this.filterNames();

    return (
      <Container>
        <Title>Phonebook</Title>
        <Form onSubmit={this.addContactToState} />
        <Title>Contacts</Title>
        <Filter onChange={this.filterHandle} />
        {filtredContacts.length <= 0 ? (
          <p>There are no contacts yet</p>
        ) : (
          <Contacts contacts={filtredContacts} onClick={this.removeContact} />
        )}

        <GlobalStyle />
      </Container>
    );
  }
}
