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



# Entry point of the application
if __name__ == "__main__":
    # Create the database tables if they do not exist
    with app.app_context():
        db.create_all()

    # Run the Flask application on the local development server with debugging enabled
    app.run(debug=True)