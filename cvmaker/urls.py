from django.urls import path
from .views import generate_cv,check_cv

urlpatterns = [
    path('generate-cv/', generate_cv),
    path('check-cv/', check_cv),
]