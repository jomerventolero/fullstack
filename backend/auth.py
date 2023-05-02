from datetime import datetime, timedelta
from functools import wraps
import jwt
from flask import jsonify, request, current_app
from werkzeug.security import generate_password_hash

from .main import User


def create_user(email, password, name, phone_number):
    """
    Creates a new user with the provided details.
    """
    user = User(
        email=email,
        password=generate_password_hash(password),
        name=name,
        phone_number=phone_number,
        is_admin=False
    )
    user.save()
    return user


def get_user_by_email(email):
    """
    Returns a user by the given email address.
    """
    return User.objects(email=email).first()


def get_user_by_id(user_id):
    """
    Returns a user by the given ID.
    """
    return User.objects(id=user_id).first()


def generate_auth_token(user_id):
    """
    Generates a new JWT auth token for the given user ID.
    """
    payload = {
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
        'sub': user_id
    }
    token = jwt.encode(
        payload,
        current_app.config.get('SECRET_KEY'),
        algorithm='HS256'
    )
    return token.decode('utf-8')


def decode_auth_token(auth_token):
    """
    Decodes the given auth token and returns the user ID.
    """
    try:
        payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def token_required(f):
    """
    Decorator for routes that require authentication. Checks if the user is logged in by verifying
    the JWT auth token in the Authorization header.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_token = request.headers.get('Authorization', '').split(' ')[1]
        if not auth_token:
            return jsonify({'message': 'Authentication required.'}), 401
        try:
            user_id = decode_auth_token(auth_token)
            if isinstance(user_id, str):
                return jsonify({'message': user_id}), 401
            user = get_user_by_id(user_id)
            if not user:
                return jsonify({'message': 'Invalid user.'}), 401
            kwargs['user'] = user
        except Exception:
            return jsonify({'message': 'Invalid token.'}), 401
        return f(*args, **kwargs)
    return decorated
