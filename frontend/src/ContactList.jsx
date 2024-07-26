import React from "react";
import "./ContactList.css";

const ContactList = ({ contacts }) => (
  <div className="contact-list">
    <h2>Contacts</h2>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.email}</td>
            <td>
              <button className="update-btn">Update</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ContactList;