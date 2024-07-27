// ContactList.jsx
// This component renders a table of contacts and provides options to update or delete each contact.
// It communicates with the parent component and the backend API for contact management.
// The component now uses Bootstrap for improved styling and layout.

import React from "react"

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    // Handle contact deletion
    const onDelete = async (id) => {
        try {
            // Prepare options for the DELETE request
            const options = {
                method: "DELETE"
            }
            // Send DELETE request to the API
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                // If deletion is successful, call updateCallback to refresh the list
                updateCallback()
            } else {
                // If deletion fails, log an error
                console.error("Failed to delete")
            }
        } catch (error) {
            // If an exception occurs, show an alert with the error
            alert(error)
        }
    }

    return (
        // Wrapper div with Bootstrap's responsive table class
        <div className="table-responsive">
            {/* Table with Bootstrap classes for styling */}
            <table className="table table-striped table-hover">
                {/* Table header */}
                <thead className="table-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {/* Map through the contacts array to create table rows */}
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                {/* Button to update the contact */}
                                <button 
                                    className="btn btn-sm btn-outline-primary me-2" 
                                    onClick={() => updateContact(contact)}
                                >
                                    Update
                                </button>
                                {/* Button to delete the contact */}
                                <button 
                                    className="btn btn-sm btn-outline-danger" 
                                    onClick={() => onDelete(contact.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Conditional rendering for empty contact list */}
            {contacts.length === 0 && (
                <p className="text-center mt-4">No contacts found. Add a new contact to get started.</p>
            )}
        </div>
    )
}

export default ContactList