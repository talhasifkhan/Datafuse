from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiEndpoints, name='api-endpoints'),
    path('pygooglenewsresponse/', views.pyGoogleNewsResponse, name="py-google-news-response")
]