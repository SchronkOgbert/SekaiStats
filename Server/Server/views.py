from .security import hash_string
from django.http import HttpResponse
import mysql.connector
from . import db_handler
import json
# from hashlib import sha256
from django.views.decorators.csrf import csrf_exempt
import re


def escape_string(value: str):
    return value


@csrf_exempt
def check_login(request):
    """
    :param request: string representing a json
    :return: 1-success, 0-wrong credentials, 2-other
    """
    try:
        db_conn = db_handler.get_connection(
            db_handler.DEFAULT_USER, db_handler.DEFAULT_PASSWORD)
        db_cursor = db_conn.cursor()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(2)
    try:
        data = json.load(request)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return HttpResponse(2)
    try:
        uname = data['user']
        passwd = data['pwd']
        # fernet = Fernet()
        # passwd = fernet.encrypt(str(data['pwd']).encode())
        # print(passwd)
        # db_conn.commit()
        # print(str(hash_string(passwd, uname))[2:-1][:64])
        print('before query')
        db_cursor.callproc('check_user', [escape_string(
            uname), str(hash_string(passwd, uname))[2:-1][:32]])
        print('ran query')
        db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(2)
    for i in db_cursor.stored_results():
        results = i.fetchone()
        print(results[0])
        return HttpResponse(results[0])


@csrf_exempt
def register(request):
    """
    :param request: json containing the data
    :return: 1-success, 0-fail, 2-user exists, 3-other
    """
    try:
        db_conn = db_handler.get_connection(
            db_handler.DEFAULT_USER, db_handler.DEFAULT_PASSWORD)
        db_cursor = db_conn.cursor()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    try:
        data = json.load(request)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return HttpResponse(3)
    try:
        uname = data['user']
        passwd = data['pwd']
        # fernet = Fernet()
        # passwd = fernet.encrypt(str(data['pwd']).encode())
        # print(passwd)
        # db_conn.commit()
        # print(str(hash_string(passwd, uname))[2:-1][:64])
        db_cursor.callproc('register_user', [escape_string(
            uname), str(hash_string(passwd, uname))[2:-1][:32]])
        # print('ran query')
        db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    for i in db_cursor.stored_results():
        results = i.fetchone()
        print(results[0])
        return HttpResponse(results[0])

# print(check_login('{"usr": "user", "pwd": "password"}'))
# print(make_key('test'))
# print(register('{"user": "testnfdois", "pwd": "76fsd8gfds8fg8s8fsd"}'))
