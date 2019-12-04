import connection_db
# sql queries come here


def get_tickers_by_user(user_id):
    query = '''
            SELECT ticker
            FROM users_tickers
            WHERE user_id = %(user_id)s;
            '''
    params = {
        'user_id': user_id
    }

    return connection_db.execute_query(query, params=params)


@connection_db.connection_handler
def register_user(cursor, user_data):
    cursor.execute("""
        INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s)
        RETURNING id
    """, {'username': user_data['username'], 'password': user_data['password']})
    user_id = cursor.fetchone()
    return user_id['id']


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
def update_time_get_user_id(cursor, username, time):
    cursor.execute("""
        UPDATE users
        SET last_login = %(time)s
        WHERE username = %(username)s
        RETURNING id
    """, {'time': time, 'username': username})
    user_id = cursor.fetchone()
    return user_id['id']


@connection_db.connection_handler
def get_existing_usernames(cursor):
    cursor.execute("""
        SELECT username
        FROM users
    """)
    user_list = cursor.fetchall()
    return user_list
