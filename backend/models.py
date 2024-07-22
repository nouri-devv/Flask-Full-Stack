from config import db

# Define the Contact class, which inherits from db.Model
# This class represents the Contact table in the database
class Contact(db.Model):
    # Define the columns of the Contact table
    id = db.Column(db.Integer, primary_key=True)  # Unique identifier for each contact
    first_name = db.Column(db.String(80), unique=False, nullable=False)  # First name of the contact, cannot be null
    last_name = db.Column(db.String(80), unique=False, nullable=False)  # Last name of the contact, cannot be null
    email = db.Column(db.String(150), unique=True, nullable=False)  # Email of the contact, must be unique and cannot be null

    # Define a method to convert the contact object to a JSON serializable format
    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email
        }