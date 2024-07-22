from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) to allow communication between backend and frontend
CORS(app)

# Configuration for SQLAlchemy, setting the database URL to a SQLite database named 'mydatabase.db'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# Disable SQLAlchemy's event system to track modifications of objects and emit signals
# This is often set to False to save resources if not needed
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the SQLAlchemy object by passing the Flask application instance
# This sets up the ORM (Object Relational Mapper) for handling database operations
db = SQLAlchemy(app)