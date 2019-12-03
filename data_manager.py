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
