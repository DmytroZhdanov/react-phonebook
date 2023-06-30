import { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactItem, DeleteButton } from './Contact.styled';

export class Contact extends Component {
  handleDelete = name => {
    this.props.onDeleteContact(name);
  };

  render() {
    const { name, number } = this.props;
    return (
      <ContactItem>
        <p>
          {name}: {number}
        </p>
        <DeleteButton
          type="button"
          onClick={() => {
            this.handleDelete(name);
          }}
        >
          Delete
        </DeleteButton>
      </ContactItem>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
