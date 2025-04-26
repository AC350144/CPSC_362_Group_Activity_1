from gevent import monkey
monkey.patch_all()

import os
import math
import random
import requests

from flask import Flask, redirect, url_for, render_template, flash, request, jsonify
from gevent.pywsgi import WSGIServer
from flask_compress import Compress
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc, func, or_, and_, create_engine
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from datetime import datetime, date

base_url = 'http://localhost'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///airbnb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = 'WRYTG^&W*R'
app.config['SQLALCHEMY_SILENCE_UBER_WARNING'] = 1
app.static_folder = 'static'

login_manager = LoginManager(app)
db = SQLAlchemy(app)

@login_manager.user_loader
def load_user(user_id):
  return User.query.get(int(user_id))



class User(UserMixin, db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    first = db.Column(db.String(20), nullable=False)
    last = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(20), nullable=False)


@app.route('/')
def home():
    if current_user.is_authenticated:
        loggedIn = True
    else:
        loggedIn = False

    if loggedIn:
        url = 'logout'
    else:
        url = 'login'
    return render_template('home.html', url=url)

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/register', methods=['POST'])
def register_post():
    firstName = request.form.get('firstName')
    lastName = request.form.get('lastName')
    email = request.form.get('email')
    password = request.form.get('password')
    
    user = User(email=email, password=password, first=firstName, last=lastName, role="rentee")
    db.session.add(user)
    db.session.commit()
    flash('Account created, you may now login')
    return redirect(url_for('login'))
    

@app.route('/login')
def login():
    if not current_user.is_authenticated:
        return render_template('login.html')
    else:
        return redirect(url_for('panel'))

@app.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    found = db.session.query(User).filter_by(email=email).first()
    if found.password == password:
        login_user(found)
    else:
        flash('Incorrect credentials, please try again.')
        return redirect(url_for('login'))
    flash('You have been logged in')
    return redirect(url_for('panel'))

@app.route('/logout')
def logout():
    if current_user.is_authenticated:
        logout_user()
        return redirect(url_for('login'))
    else:
        flash('You are not logged in.')
        return redirect(url_for('login'))

@app.route('/panel')
@login_required
def panel():
    return render_template('panel.html')

@app.route('/panel/account')
@login_required
def account():
    password_length = len(current_user.password)
    return render_template("account.html", password_length=password_length)

@app.route('/panel/settings')
@login_required
def settings():
    return 'Coming soon'


if __name__ == "__main__":
    print('airbnb is successfully online')
    http_server = WSGIServer(('0.0.0.0', 80), app)
    http_server.serve_forever()
    compress = Compress()
    compress.init_app(app)
    db.create_all()
