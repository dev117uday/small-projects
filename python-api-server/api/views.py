from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core import serializers
from django.conf import settings
import json
import requests
from bs4 import BeautifulSoup
# Create your views here.

@api_view(['GET'])
def barcodeData(request,toSearch):
    try:
        dataToSearch = str(toSearch)
        USER_AGENT = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}
        google_url = 'https://www.google.com/search?q={}'.format(dataToSearch)
        response = requests.get(google_url, headers=USER_AGENT).text
        soup = BeautifulSoup(response, 'lxml')
        answer = {
            'code' : dataToSearch,
            'result' : [],
        }

        for article in soup.find_all('a'):
            hx = article.find('h3', class_='LC20lb DKV0Md')
            if hx != None:
                hx = str(hx)
                start = '<h3 class="LC20lb DKV0Md">'
                end = '</h3>'
                x = (hx.split(start))[1].split(end)[0]
                x = x[:-4]
                answer['result'].append(x)
            else:
                pass

        if answer['result'].__len__() > 3 :
            answer['result'] = answer['result'][0:3]
            x = json.dumps(answer)
        else :
            x = json.dumps(answer)

        return Response(x)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
