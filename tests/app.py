from flask import Flask
from config import Config
from models import db, User
from flask_login import LoginManager
from auth import auth as auth_blueprint
from admin import admin as admin_blueprint



app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

@login_manager.user_loader
def load_user(id):
    return User.query


if __name__ == '__main__':
    app.run(debug=True)