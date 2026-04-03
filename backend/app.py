from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, ContactMessage

app = Flask(__name__)
# Enable CORS so the frontend can communicate with the backend
CORS(app)

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Initialize database tables
with app.app_context():
    db.create_all()

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # Simple validation
    if not name or not email or not message:
        return jsonify({"error": "Missing required fields"}), 400
        
    try:
        new_message = ContactMessage(name=name, email=email, message=message)
        db.session.add(new_message)
        db.session.commit()
        return jsonify({"success": "Message sent successfully! I will get back to you soon."}), 201
    except Exception as e:
        print(f"Error saving message: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
