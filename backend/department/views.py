from turtle import pos
from typing_extensions import Self
from django.shortcuts import render
from django.http import HttpResponse
from .models import department, department_types
import json
from department.serializers import DepartmentSerializer
from rest_framework.parsers import JSONParser
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
# from django.core.mail import send_mail


@csrf_exempt
def getAllDepartments(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            post_data = post_data["data"]
            if(post_data["isAdmin"]):
                if (post_data and post_data["department"] != "All"):
                    response_data = department.objects.filter(
                        department_name__contains=post_data['department']).order_by('department_name')
                else:
                    response_data = department.objects.values().order_by('department_name')
            else:
                if (post_data and post_data["department"] != "All"):
                    response_data = department.objects.filter(
                        department_name__contains=post_data['department']).exclude(department_type_id=1).order_by('department_name')
                else:
                    response_data = department.objects.exclude(
                        department_type_id=1).order_by('department_name')

            response_data = DepartmentSerializer(response_data, many=True)

            return HttpResponse(json.dumps(response_data.data), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
            return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def insertBulkDepartments(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        # for item in post_data['departments']:
        #     response_data = department(department_name=item)
        #     response_data.save()
        department.objects.bulk_create([department(department_type=department_types.objects.get(
            id=dept["type"]), department_name=dept["name"],
            number_of_students=dept["number_of_students"]) for dept in post_data['departments']])
        return HttpResponse(json.dumps("done"), content_type="application/json")
