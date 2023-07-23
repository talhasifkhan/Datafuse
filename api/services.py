import json
import logging
import os
from urllib.parse import urlparse

import openai
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from pygooglenews import GoogleNews


load_dotenv()

url = urlparse(os.environ.get("REDIS_TLS_URL"))
openai.api_key = os.environ.get("OPEN_AI_KEY")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


class DictToJSON(dict):
    def __str__(self):
        return json.dumps(self)

class SummaryService:
    def pyGoogleNewsResponse(self, request):
        gn = GoogleNews()
        q = request.query_params.get('search')
        request_body = json.loads(request.body)
        response = gn.search(q, when=request_body["Time Frame"])
        response_json = DictToJSON(response)
        return response_json

    def scrapeSite(self, request):
        headers = {
            'User-Agent': 'python-requests/2.26.0',
            'Accept-Encoding': 'gzip, deflate', 'Accept': 'application/json', 'Connection': 'keep-alive'
        }

        try:
            url_request = requests.get(request, headers, timeout=5)
            logging.info(url_request.request.headers)
            logger.info(f"Successfully got webpage {request}.")
            logger.info(url_request.text)
        except Exception as e:
            logger.error(f"Error in getting webpage {request}: {e}.")
            return -1

        soup = BeautifulSoup(url_request.text, 'html.parser')

        fullText = ""
        for paragraph in soup.find_all('p'):
            if len(paragraph.text) <= 150:
                continue
            fullText += paragraph.text

        if (fullText):
            length = len(fullText)
            if length < 400:
                logger.info(f"Skipping webpage {request} due to article length.")
                return -1
            elif length > 1800:
                fullText = fullText[:1800]
                logger.info("Webpage text truncated to fit max limit.")
            return fullText

        return "Sorry, we couldn't get a summary because of a paywall or lack of access."


    def summarize(self, request):
        try:
            chat_completion = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", max_tokens=120, messages=[{"role": "user", "content": f"Summarize: {request}"}])
            logger.info(chat_completion)
            return chat_completion['choices'][0]['message']['content']
        except Exception as e:
            logger.error(f"Error in getting webpage {request}: {e}.")
            return -1
