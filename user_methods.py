import data_manager
import datetime
import bcrypt
from flask import session


def handle_register(user_data):
    user_data['password'] = hash_password(user_data['password'])
    data_manager.register_user(user_data)


def handle_login(user_data):
    hashed_password = data_manager.get_hashed_password(user_data['username'])
    is_verified = verify_password(user_data['password'], hashed_password)

    if is_verified:
        timestamp = datetime.datetime.now().replace(microsecond=0)
        user_id = data_manager.update_time_get_user_id(user_data['username'], timestamp)
        session['username'] = user_data['username']
        session['user_id'] = user_id
    return is_verified


def get_users():
    return data_manager.get_existing_usernames()


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)
