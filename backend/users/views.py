import json
from turtle import pos
from django.http import HttpResponse

from department.models import department, department_head
from department.serializers import DepartmentHeadSerializer, DepartmentSerializer
from .models import users_table
from rest_framework.parsers import JSONParser
from .serializers import UsersSerializer
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            if (post_data):
                response = users_table.objects.filter(
                    username=post_data["username"], password=post_data["password"])
                response = UsersSerializer(response, many=True)

                data = json.loads(json.dumps(response.data[0]))
                # if(result["isAdmin"]):
                # department_id = department_head.objects.filter(
                #     user_id=users_table.objects.get(id=result["id"]))

                # department_id = DepartmentHeadSerializer(
                #     department_id, many=True)
                # print(department_id)

                department_details = department.objects.filter(
                    id=data["department_id"])
                department_details = DepartmentSerializer(
                    department_details, many=True)
                print(department_details.data)
                data["department"] = department_details.data[0]
                del data["department_id"]
                result = {
                    "result": data,
                    "status": True
                }
                return HttpResponse(json.dumps(result), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
        return HttpResponse(json.dumps(result), content_type="application/json")
