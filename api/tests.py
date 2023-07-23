from django.test import TestCase
from rest_framework.test import APIRequestFactory
import json


class ViewsTest(TestCase):

    def test_get_results(self):
        factory = APIRequestFactory()
        request = factory.post("/api/get-results/?search=test", {'Result Amount': 3, "Topic": "", "Time Frame": ""}, format='json')
        request_body = json.loads(request.body)

        # {"cards": [
        #     {"title": "", "url": "", "paragraph": ""},
        #     {"title": "", "url": "", "paragraph": ""}
        #     ]
        # }
