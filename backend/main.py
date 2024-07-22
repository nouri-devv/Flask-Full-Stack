from flask import request, jsonify
from config import app, db
from models import Contact

# Define a route to retrieve all contacts from the database
@app.route("/contacts", methods=["GET"])
def get_contacts():
    # Query all contacts from the Contact table
    contacts = Contact.query.all()
    
    # Convert the list of contact objects to a list of JSON serializable dictionaries
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    
    # Return the list of contacts as a JSON response
    return jsonify({"contacts": json_contacts})

# Route to create a new contact in the database
@app.route("/create_contact", methods=["POST"])
def create_contact():
    # Retrieve data from the JSON request body
    first_name = request.json.get("firstName")  # Corrected typo: "fistName" to "firstName"
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    # Check if any of the required fields are missing
    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "Must enter first name, last name and email"}), 400
        )
    
    # Create a new Contact object with the provided data
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

    try:
        # Attempt to add the new contact to the database
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        # If an error occurs, return an error message and a 400 status code
        return jsonify({"message": str(e)}), 400
    
    # If successful, return a success message and a 201 status code
    return jsonify({"message": "user created"}), 201

# Route to update an existing contact in the database
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    # Retrieve the contact from the database by user ID
    contact = Contact.query.get(user_id)

    # If the contact does not exist, return a 404 Not Found response
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    # Get the data from the JSON request body
    data = request.json
    # Update the contact's attributes if new data is provided, otherwise keep existing values
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)  # Corrected typo: "lastName" to "last_name"
    contact.email = data.get("email", contact.email)

    # Commit the changes to the database
    db.session.commit()

    # Return a success message with a 201 Created status code
    return jsonify({"message": "User was updated"}), 201

# Route to delete a contact from the database
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    # Retrieve the contact from the database by user ID
    contact = Contact.query.get(user_id)

    # If the contact does not exist, return a 404 Not Found response
    if not contact:
        return jsonify({"message": "User not found"}), 404

    # Delete the contact from the database
    db.session.delete(contact)
    db.session.commit()

    # Return a success message
    return jsonify({"message": "User was deleted"}), 200

# Entry point of the application
if __name__ == "__main__":
    # Create the database tables if they do not exist
    with app.app_context():
        db.create_all()

    # Run the Flask application on the local development server with debugging enabled
    app.run(debug=True)