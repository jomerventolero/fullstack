from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = "ccf2e9fb4a24459724d9200f72a16f0d"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///appointments.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def decode_auth_token(auth_token):
    """
    Decodes the given auth token and returns the user ID.
    """
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(80), nullable=False)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    time = db.Column(db.String(5), nullable=False)

# create the database tables
db.create_all()

# create a hardcoded admin user
admin = User(username='admin', email='admin@example.com', phone='1234567890', password=generate_password_hash('admin'))

# add the admin user to the database
db.session.add(admin)
db.session.commit()


# authentication routes
@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    phone = request.json.get('phone')
    password = request.json.get('password')
    hashed_password = generate_password_hash(password)

    new_user = User(username=username, email=email, phone=phone, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'message': 'Invalid username or password'}), 401

    if check_password_hash(user.password, password):
        return jsonify({'message': 'Logged in successfully!'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401


# appointment routes
@app.route('/appointments', methods=['POST'])
def make_appointment():
    date = request.json.get('date')
    time = request.json.get('time')

    # get the authenticated user
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication required'}), 401

    auth_token = auth_header.split(" ")[1]
    user = User.query.filter_by(id=decode_auth_token(auth_token)).first()

    # check if the user is authorized to make an appointment
    if user.username != 'admin':
        return jsonify({'message': 'You are not authorized to make an appointment'}), 403

    new_appointment = Appointment(user_id=user.id, date=date, time=time)
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({'message': 'Appointment created successfully!'}), 201


@app.route('/appointments', methods=['GET'])
def get_appointments():
    # get the authenticated user
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication required'}), 401

    auth_token = auth_header.split(" ")[1]
    user = User.query.filter_by(id=decode_auth_token(auth_token)).first()

    # check if the user is authorized to view the appointments
    if user.username != 'admin':
        return jsonify({'message': 'You are not authorized to view the appointments'}), 403

    appointments = Appointment.query.all()

    appointment_list = []
    for appointment in appointments:
        appointment_data = {}
        appointment_data['id'] = appointment.id
        appointment_data['user_id'] = appointment.user_id
        appointment_data['date'] = appointment.date
        appointment_data['time'] = appointment.time
        appointment_list.append(appointment_data)

    return jsonify({'appointments': appointment_list}), 200

if __name__ == '__main__':
    app.run(debug=True)
