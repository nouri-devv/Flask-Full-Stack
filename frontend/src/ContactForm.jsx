// ContactForm.jsx
// This component renders a form for creating or updating a contact.
// It handles form submission and communicates with the backend API.
// The component now uses Bootstrap for improved styling and layout.

import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    // State for form fields, initialized with existing contact data if available
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    // Determine if we're updating an existing contact or creating a new one
    // If existingContact is not empty, we're updating
    const updating = Object.entries(existingContact).length !== 0

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault() // Prevent default form submission behavior

        // Prepare the data to be sent to the API
        const data = {
            firstName,
            lastName,
            email
        }

        // Determine the appropriate API endpoint based on whether we're updating or creating
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")

        // Prepare the options for the fetch request
        const options = {
            method: updating ? "PATCH" : "POST", // Use PATCH for update, POST for create
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // Convert data to JSON string
        }

        // Send the request to the API
        const response = await fetch(url, options)

        if (response.status !== 201 && response.status !== 200) {
            // If the response is not successful, show an error message
            const data = await response.json()
            alert(data.message)
        } else {
            // If successful, call the updateCallback to refresh the contact list
            updateCallback()
        }
    }

    return (
        // The form now uses Bootstrap classes for styling
        <form onSubmit={onSubmit}>
            {/* Form group for first name input */}
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required // Make the field required
                />
            </div>
            {/* Form group for last name input */}
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required // Make the field required
                />
            </div>
            {/* Form group for email input */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email" // Changed to email type for better validation
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // Make the field required
                />
            </div>
            {/* Submit button with Bootstrap styling */}
            {/* The button text changes based on whether we're updating or creating */}
            <button type="submit" className="btn btn-primary">
                {updating ? "Update" : "Create"}
            </button>
        </form>
    );
};

export default ContactForm