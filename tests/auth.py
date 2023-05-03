from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required
from werkzeug.urls import url_parse
from .models import User
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    # Your login view logic here

@auth.route('/logout')
@login_required
def logout():
    # Your logout view logic here

@auth.route('/register', methods=['GET', 'POST'])
def register():
    # Your register view logic here
