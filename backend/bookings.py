import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

# Connect to SQLite3 database
conn = sqlite3.connect('bookings.db')
c = conn.cursor()

# Create bookings table if it does not exist
c.execute('''
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL
    )
''')

@app.route('/book-meeting', methods=['POST'])
def book_meeting():
    """
    Endpoint to book a meeting
    """
    data = request.get_json()

    # Validate request data
    if not data:
        return jsonify({'error': 'No request data provided'}), 400

    if 'name' not in data:
        return jsonify({'error': 'Name is required'}), 400

    if 'email' not in data:
        return jsonify({'error': 'Email is required'}), 400

    if 'date' not in data:
        return jsonify({'error': 'Date is required'}), 400

    if 'time' not in data:
        return jsonify({'error': 'Time is required'}), 400

    # Save booking to database
    c.execute('''
        INSERT INTO bookings (name, email, date, time)
        VALUES (?, ?, ?, ?)
    ''', (data['name'], data['email'], data['date'], data['time']))
    conn.commit()

    # Return success response
    return jsonify({'success': 'Meeting booked successfully!'}), 200
