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

# Entry point of the application
if __name__ == "__main__":
    # Create the database tables if they do not exist
    with app.app_context():
        db.create_all()

    # Run the Flask application on the local development server with debugging enabled
    app.run(debug=True)