from nturl2path import url2pathname
from django.urls import URLPattern, path
from . import views

urlpatterns =[
    path('getAllDepartments/', views.getAllDepartments),
    path('insertBulkDepartments/', views.insertBulkDepartments)
]