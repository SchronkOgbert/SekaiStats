from .security import hash_string
from django.http import HttpResponse
import mysql.connector
from . import db_handler
import json
# from hashlib import sha256
from django.views.decorators.csrf import csrf_exempt
import re
from copy import deepcopy


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
        return HttpResponse(3)
    try:
        uname = data['user']
        passwd = data['pwd']
        print('before query')
        db_cursor.callproc('check_user', [escape_string(
            uname), str(hash_string(passwd, uname))[2:-1][:32]])
        # print('ran query')
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


@csrf_exempt
def search_posts(request):
    """
    searches the database for posts that match criteria
    :param request: json that has the criteria
    :return: all the posts
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
        keyword = data['keyword']
        exact_match = bool(data['exact_match'])
        db_cursor.callproc('search_posts', [keyword, exact_match])
        db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    results = []
    for i in db_cursor.stored_results():
        buffer = i.fetchone()
        dict_buffer = {
            'postName': '',
            'postUser': '',
            'postDate': ''
        }
        while buffer:
            dict_buffer['postName'] = buffer[0]
            dict_buffer['postUser'] = buffer[1]
            dict_buffer['postDate'] = buffer[2]
            results.append(deepcopy(dict_buffer))
            buffer = i.fetchone()
    return HttpResponse(json.dumps(results))


@csrf_exempt
def get_post(request):
    try:
        db_conn = db_handler.get_connection(
            db_handler.DEFAULT_USER, db_handler.DEFAULT_PASSWORD)
        db_cursor = db_conn.cursor()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    try:
        data = json.load(request)
        if 'postName' not in data or 'postUser' not in data or 'postDate' not in data:
            raise json.JSONDecodeError
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return HttpResponse(3)
    try:
        post_name = data['post_name']
        post_user = data['post_usr']
        post_date = data['post_date']
        db_cursor.callproc('get_post', [post_name, post_user, post_date])
        db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    results = []
    for i in db_cursor.stored_results():
        results.append(json.dumps(i.fetchone()))
    return HttpResponse(results)


# print(check_login('{"usr": "user", "pwd": "password"}'))
# print(make_key('test'))
# print(register('{"user": "testnfdois", "pwd": "76fsd8gfds8fg8s8fsd"}'))
