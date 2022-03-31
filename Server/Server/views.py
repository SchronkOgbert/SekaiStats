import mysql.connector
import db_handler
import json


def check_login(request):
    """
    :param request: string representing a json
    :return: 0-success, 1-no user, 2-wrong password, 3-other
    """
    try:
        db_conn = db_handler.get_connection(db_handler.DEFAULT_USER, db_handler.DEFAULT_PASSWORD)
        db_cursor = db_conn.cursor()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return 3
    try:
        data = json.loads(request)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return 3
    try:
        uname = data['user']
        passwd = data['password']
        # db_conn.commit()
        db_cursor.execute(f"call check_user('{uname}', '{passwd}');")
        # print('ran query')
        # db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return 3
    for val in db_cursor:
        return int(not val[0])


# print(check_login('{"user": "user", "password": "password"}'))
