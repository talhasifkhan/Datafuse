from typing import Dict
from django.shortcuts import render
import api
import requests
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pygooglenews import GoogleNews
from bs4 import BeautifulSoup
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
import redis
import time
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

url = urlparse(os.environ.get("REDIS_URL"))
r = redis.Redis(host=url.hostname, port=url.port, username=url.username, password=url.password,
                ssl=True, ssl_cert_reqs=None, decode_responses=True, charset="utf-8")


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


class DictToJSON(dict):
    def __str__(self):
        return json.dumps(self)


@api_view(['GET'])
def apiEndpoints(request):
    api_urls = {'hello': 'there', }
    return Response(api_urls)


@api_view(['GET'])
def getResults(request):
    q = request.query_params.get('search')

    if (r.exists(q)):
        result = r.get(q)
        result_dict = json.loads(result)
        result_json = DictToJSON(result_dict)
        time.sleep(1.5)
        return Response(result_json)

    result = {"cards": []}
    card_count = 0
    response = pyGoogleNewsResponse(request)

    for i in range(20):
        if card_count == 10:
            break

        title = response['entries'][i]['title']
        url = response['entries'][i]['link']
        paragraph = scrapeSite(url)
        if paragraph == -1:
            continue

        card = {"title": title, "url": url, "paragraph": paragraph, }
        result["cards"].append(card)
        card_count += 1

    result_json = DictToJSON(result)

    r.set(q, str(result_json), ex=3600)

    return Response(result_json)


# removed api view header and return Response
def pyGoogleNewsResponse(request):
    gn = GoogleNews()
    q = request.query_params.get('search')
    response = gn.search(q)
    response_json = DictToJSON(response)
    return response_json


def scrapeSite(request):
    headers = {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'}
    try:
        url_request = requests.get(request, headers)
    except:
        return -1
    soup = BeautifulSoup(url_request.content, 'html.parser')

    for paragraph in soup.find_all('p'):
        if len(paragraph.text) > 200:
            return paragraph.text

    return "Sorry, we couldn't get a summary because of a paywall or lack of access."


# Testing Block
'''
@api_view(['GET'])
def getResults(request):
    result = {"cards" : []}
    card_count = 0
    #response_json = json.dumps(response)

    for i in range(20):
        if card_count == 10:
            break

        title = f"{i} Article Title"
        url = "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container"
        paragraph = "This is a random blurb for testing the paragraph. Just putting random text here. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        card = {"title" : title, "url" : url, "paragraph" : paragraph,}
        result["cards"].append(card)
        card_count += 1
    
    result_json = DictToJSON(result)
    
    return Response(result_json)
'''
