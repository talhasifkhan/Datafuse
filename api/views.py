import json
import logging
import os
from urllib.parse import urlparse

import openai
from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import services

load_dotenv()

url = urlparse(os.environ.get("REDIS_TLS_URL"))
openai.api_key = os.environ.get("OPEN_AI_KEY")

summary_service = services.SummaryService()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class DictToJSON(dict):
    def __str__(self):
        return json.dumps(self)

@api_view(['POST'])
def get_results(request):
    request_body = json.loads(request.body)

    result = {"cards": []}
    card_count = 0
    response = summary_service.pyGoogleNewsResponse(request)

    # result amount from request body sets card count limit, but range allows up to 10 attempts
    for i in range(10):
        if card_count == request_body["Result Amount"]:
            break

        title = response['entries'][i]['title']
        url = response['entries'][i]['link']
        rawText = summary_service.scrapeSite(url)
        if rawText == -1:
            continue

        summary = summary_service.summarize(rawText)
        card = {"title": title, "url": url, "paragraph": summary}
        result["cards"].append(card)
        card_count += 1

    result_json = DictToJSON(result)

    return Response(result_json)
