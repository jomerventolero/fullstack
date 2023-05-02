from flask import Flask, jsonify, request
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_migrate import Migrate
import datetime

app = Flask(__name__)

CORS(app)


app.config['SECRET_KEY'] = 'asdfghjklqwertyuiop'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
''' 
    Appointment Data Model
'''
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"Appointment(id={self.id}, name='{self.name}', email='{self.email}', phone='{self.phone}', date='{self.date}')"


@app.route('/appointments', methods=['POST'])
def create_appointment():
    name = request.json['name']
    email = request.json['email']
    phone = request.json['phone']
    date = datetime.strptime(request.json['date'], '%Y-%m-%d %H:%M:%S')

    appointment = Appointment(name=name, email=email, phone=phone, date=date)
    db.session.add(appointment)
    db.session.commit()

    return jsonify({'id': appointment.id})


@app.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.order_by(Appointment.date).all()
    result = []
    for appointment in appointments:
        result.append({
            'id': appointment.id,
            'name': appointment.name,
            'email': appointment.email,
            'phone': appointment.phone,
            'date': appointment.date.strftime('%Y-%m-%d %H:%M:%S')
        })
    return jsonify(result)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401
    login_user(user)
    return jsonify({'message': 'Logged in successfully'}), 200

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/test', methods=['GET'])
def test_enpoint():
    return jsonify({'message': 'You are authenticated!'})

if __name__ == '__main__':
    app.run(debug=True)
