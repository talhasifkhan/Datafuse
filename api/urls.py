from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiEndpoints, name='api-endpoints'),
    path('getresults/', views.getResults, name="get-results")
]