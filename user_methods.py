import data_manager
import bcrypt


def handle_register(user_data):
    user_data['password'] = hash_password(user_data['password'])
    data_manager.register_user(user_data)


def handle_login(user_data):
    plain_text_password = user_data['password']
    hashed_password = data_manager.get_hashed_password(user_data['username'])
    return verify_password(plain_text_password, hashed_password)


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)