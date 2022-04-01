import mysql.connector
import db_handler
import json
# from cryptography.fernet import Fernet
from hashlib import sha256


def make_key(username):
    return sha256((username[:3] + username[2:7]).encode()).digest()


def check_login(request):
    """
    :param request: string representing a json
    :return: 1-success, 0-wrong credentials, 2-other
    """
    try:
        db_conn = db_handler.get_connection(db_handler.DEFAULT_USER, db_handler.DEFAULT_PASSWORD)
        db_cursor = db_conn.cursor()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return 2
    try:
        data = json.loads(request)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return 2
    try:
        uname = data['usr']
        passwd = data['pwd']
        # fernet = Fernet()
        # passwd = fernet.encrypt(str(data['pwd']).encode())
        # print(passwd)
        # db_conn.commit()
        db_cursor.execute(f"call check_user('{uname}', '{passwd}');")
        # print('ran query')
        # db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return 2
    for val in db_cursor:
        return int(val[0])


def register(request):
    """
    :param request: json containing the data
    :return: 1-success, 0-fail, 2-user exists, 3-other
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
        uname = data['usr']
        passwd = data['pwd']
        # fernet = Fernet()
        # passwd = fernet.encrypt(str(data['pwd']).encode())
        # print(passwd)
        # db_conn.commit()
        db_cursor.execute(f"call register_user('{uname}', '{passwd}');")
        # print('ran query')
        # db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return 3
    for val in db_cursor:
        return int(val[0])


# print(check_login('{"usr": "user", "pwd": "password"}'))
# print(make_key('test'))
# print(register('{"usr": "testnfdois", "pwd": "76fsd8gfds8fg8s8fsd"}'))
