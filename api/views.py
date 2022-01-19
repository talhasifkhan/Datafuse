from typing import Dict
from django.shortcuts import render
import api
import requests, json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pygooglenews import GoogleNews
from bs4 import BeautifulSoup

# Create your views here.

class DictToJSON(dict):
    def __str__(self):
        return json.dumps(self)

@api_view(['GET'])
def apiEndpoints(request):
    api_urls = {'hello' : 'there',}
    return Response(api_urls)

@api_view(['GET'])
def pyGoogleNewsResponse(request):
    #print(request.query_params)
    gn = GoogleNews()
    q = request.query_params.get('search')
    print(q)
    response = gn.search(q)
    response_json = DictToJSON(response)
    return Response(response_json)

@api_view(['GET'])
def scrapeSite(request):
    url_request = requests.get(request, headers)
    soup = BeautifulSoup(url_request.content, 'html.parser')
    return Response(soup)