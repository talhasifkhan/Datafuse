from django.urls import path
from . import views

urlpatterns = [
    path('get-results/', views.get_results, name="get-results")
]