from mysql import connector

DEFAULT_USER = 'remote'
DEFAULT_PASSWORD = 'a63#*!3V4Py@^2Dy'

_db_connection = None
_user = DEFAULT_USER


def get_connection(user, password):
    global _db_connection
    global _user
    if _db_connection is not None and _user == user:
        return _db_connection
    _user = user
    connection = connector.connect(
        host='vacabaltata.ddns.net',
        port=3306,
        user=user,
        passwd=password,
        database='site_data'
    )
    _db_connection = connection
    return _db_connection


_db_connection = get_connection(DEFAULT_USER, DEFAULT_PASSWORD)
# print(db_connection)
