import connection_db


@connection_db.connection_handler
def register_user(cursor, user_data):
    cursor.execute("""
        INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s)
    """, {'username': user_data['username'], 'password': user_data['password']})

@connection_db.connection_handler
def get_hashed_password(cursor, username):
    cursor.execute("""
        SELECT password
        FROM users
        WHERE username = %(username)s
    """, {'username': username})
    password = cursor.fetchone()
    return password['password']  # so it returns a string instead of Dict


@connection_db.connection_handler
def update_last_login(cursor, username, time):
    cursor.execute("""
        UPDATE users
        SET last_login = %(time)s
        WHERE username = %(username)s
    """, {'time': time, 'username': username})