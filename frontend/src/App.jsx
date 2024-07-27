// App.jsx
// This is the main component of the application. It manages the state of contacts,
// controls the modal for creating/editing contacts, and renders the ContactList and ContactForm components.
// The component now uses Bootstrap for improved styling and layout.

import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./App.css";

function App() {
  // State for storing the list of contacts
  const [contacts, setContacts] = useState([]);
  // State for controlling the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // State for storing the contact being edited (if any)
  const [currentContact, setCurrentContact] = useState({})

  // useEffect hook to fetch contacts when the component mounts
  useEffect(() => {
    fetchContacts()
  }, []); // Empty dependency array means this effect runs once on mount

  // Asynchronous function to fetch contacts from the backend API
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts); // Update the contacts state with fetched data
  };

  // Function to close the modal and reset the current contact
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({}) // Reset the current contact to an empty object
  }

  // Function to open the modal for creating a new contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // Function to open the modal for editing an existing contact
  const openEditModal = (contact) => {
    if (isModalOpen) return // Prevent opening if already open
    setCurrentContact(contact) // Set the contact to be edited
    setIsModalOpen(true)
  }

  // Callback function to update the contact list after a change
  const onUpdate = () => {
    closeModal()
    fetchContacts() // Refetch the contacts to reflect the changes
  }

  return (
    // Container div with Bootstrap classes for responsive layout
    <div className="container mt-5">
      {/* Main heading for the application */}
      <h1 className="text-center mb-4">Contact Manager</h1>
      {/* Row and column for centering content */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Render the ContactList component, passing necessary props */}
          <ContactList 
            contacts={contacts} 
            updateContact={openEditModal} 
            updateCallback={onUpdate} 
          />
          {/* Button to open the modal for creating a new contact */}
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={openCreateModal}>Create New Contact</button>
          </div>
        </div>
      </div>
      
      {/* Conditional rendering of the modal */}
      {isModalOpen && (
        // Bootstrap modal structure
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* Dynamic modal title based on whether we're editing or creating */}
                <h5 className="modal-title">{currentContact.id ? 'Edit Contact' : 'Create New Contact'}</h5>
                {/* Close button for the modal */}
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {/* Render the ContactForm component inside the modal */}
                <ContactForm 
                  existingContact={currentContact} 
                  updateCallback={onUpdate} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for the modal, only rendered when modal is open */}
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default App;