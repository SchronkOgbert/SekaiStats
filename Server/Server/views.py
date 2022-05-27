from datetime import datetime

from cryptography.utils import deprecated

from .security import hash_string
from django.http import HttpResponse
import mysql.connector
from . import db_handler
import json
# from hashlib import sha256
from django.views.decorators.csrf import csrf_exempt
import re
from copy import deepcopy
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.generic import TemplateView
from django.urls import path

post_urls = []


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
        category = json.dumps(data['categories'])
        db_cursor.callproc('search_posts', [keyword, category, exact_match])
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
            'postDate': '',
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
        print(data)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return HttpResponse(3)
    try:
        post_name = data['postName']
        post_user = data['postUser']
        post_date = datetime.strptime(data['postDate'], '%d/%m/%y')
        print(post_date)
        db_cursor.callproc(
            'get_post', [post_name, post_user, post_date])
        db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    results = []
    for i in db_cursor.stored_results():
        results.append(json.dumps(i.fetchone()))
    print(results)
    return HttpResponse(results)


@csrf_exempt
def go_to_post(request):
    try:
        print(f'request: {json.load(request)}')
        data = json.load(request)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return HttpResponse(2)
    target = str(data['postName']).replace(' ', '_')
    if target in post_urls:
        return redirect('target')
    post_urls.append(
        path(target, TemplateView.as_view(template_name='post.html')))
    try:
        post_data = json.load(get_post(request))
    except Exception as e:
        print(e)
        return HttpResponse(3)
    # for url in urlpatterns:
    #     if(url[''])
    return render(request, target, post_data)


@csrf_exempt
def make_post(request):
    try:
        db_conn = db_handler.get_connection(
            db_handler.DEFAULT_USER, db_handler.DEFAULT_PASSWORD)
        db_cursor = db_conn.cursor()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    try:
        data = json.load(request)
        print(data)
    except json.JSONDecodeError as err:
        print('JSON error: ', err)
        return HttpResponse(3)
    try:
        post_name = data['postName']
        post_user = data['postUser']
        post_link = data['postLink']
        post_text_body = data['postTextBody']
        post_categories = json.dumps(data['postCategories'])
        post_data_source = data['postDataSource']
        db_cursor.execute(f'select parse_categories({post_categories});')
        post_categories = db_cursor.fetchone()
        db_cursor.callproc(
            'make_post', [post_name, post_user, post_link, post_text_body, post_categories, post_data_source])
        db_conn.commit()
    except mysql.connector.Error as err:
        print('Sql error: ', err)
        return HttpResponse(3)
    results = []
    for i in db_cursor.stored_results():
        results.append(json.dumps(i.fetchone()))
    print(results)
    return HttpResponse(results)


# from urls import urlpatterns


# print(check_login('{"usr": "user", "pwd": "password"}'))
# print(make_key('test'))
# print(register('{"user": "testnfdois", "pwd": "76fsd8gfds8fg8s8fsd"}'))
