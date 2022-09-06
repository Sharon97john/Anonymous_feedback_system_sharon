import datetime
from distutils.log import error
from pydoc import describe
from turtle import pos
from urllib import response
from django.http import HttpResponse
import feedback

from users.serializers import UsersSerializer
from .serializers import CustomFeedbackSerializer, QuestionSerializer, OptionsSerializer, QuestionTypeSerializer, VotingFeedbackSerializer
from .models import answer, general_feedback, custom_feedback, question, optionsTable, question_answer_type, votingFeedback
import json
from rest_framework.parsers import JSONParser
# Create your views here.
from department.serializers import DepartmentHeadSerializer
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from department.models import department, department_head
from users.models import users_table
from rest_framework.renderers import JSONRenderer


@csrf_exempt
def sendGeneralFeedback(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            post_data = post_data["feedback"]
            get_dept = department.objects.get(id=post_data["department_id"])
            response_data = general_feedback(department_id=get_dept,
                                             description=post_data["description"], user_id=users_table.objects.get(id=post_data["user_id"]))
            response_data.save()
            get_deptHead = department_head.objects.filter(
                department_id=get_dept)
            get_deptHead = DepartmentHeadSerializer(get_deptHead, many=True)
            get_deptHead = json.dumps(get_deptHead.data)
            get_user = users_table.objects.filter(
                id=json.loads(get_deptHead)[0]["user_id"])
            get_user = UsersSerializer(get_user, many=True)
            user = json.loads(json.dumps(get_user.data))[0]
            message = "Hi " + user['full_name'] + \
                ", \n" + post_data['description']

            sendEmail(message, user['username'])
            result = {
                "status": True,
                "message": "Mail send successfully !"

            }
            return HttpResponse(json.dumps(result), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
            return HttpResponse(json.dumps(result), content_type="application/json")


def sendEmail(message, user_email):
    send_mail(
        'New Feedback/Suggestion',
        message,
        'johnsharon021@gmail.com',
        [user_email],
        fail_silently=False,
    )


@csrf_exempt
def saveCustomFeedbackAnswers(request):
    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_data = post_data["data"]

        answer.objects.bulk_create(
            [answer(feedback_id=custom_feedback.objects.get(
                id=post_data["feedback_id"]),
                user_id=users_table.objects.get(
                id=post_data["user_id"]),
                question_id=question.objects.get(
                id=item["question"]),
                description=item["option_id"] if item["is_option"] else item["answer"]) for item in post_data["form"]]
        )
        result = {
            "status": True,
            "message": "Answers added successfully !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")

@csrf_exempt
def getAnalysis(request):
    if request.method == "POST":
        post_data = JSONParser().parse(request)
        post_data = post_data["data"]
        question_list = []
        if(answer.objects.filter(feedback_id=post_data["feedback_id"])):
            question_list = question.objects.filter(feedback_id=post_data['feedback_id']).filter(isOption=True)
            question_list = QuestionSerializer(question_list, many=True)
            question_list = json.loads(json.dumps(question_list.data))
            for quest in question_list:
                options = OptionsSerializer(optionsTable.objects.filter(question_id=quest["id"]), many=True)
                options = json.loads(json.dumps(options.data))
                quest["title"] = quest["description"]
                del quest["description"]
                series = []
                labels = []
                for option in options:
                    count = answer.objects.filter(feedback_id=post_data["feedback_id"]).filter(question_id=quest["id"]).filter(description=str(option["id"])).count()
                    labels.append(option["description"])
                    series.append(count)
                quest["labels"] = labels
                quest["series"] = series
        
        # question_list["total_count"] = answer.objects.filter(feedback_id=post_data["feedback_id"]).distinct("user_id").count()
        result = {
            "data": question_list,
            "status": True,
            "message": "Answers added successfully !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")

@csrf_exempt
def getDepartmentCustomForms(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        if(not post_data["isAdmin"]):
            form_details = custom_feedback.objects.filter(
                department_id=post_data['department']).order_by('created_date').exclude(is_published=False)
        else:
            form_details = custom_feedback.objects.filter(
                department_id=post_data['department']).order_by('created_date')

        form_details = CustomFeedbackSerializer(form_details, many=True)
        form_details = json.loads(json.dumps(form_details.data))

        for item in form_details:
            questions_details = question.objects.filter(
                feedback_id=item["id"])
            questions_details = QuestionSerializer(
                questions_details, many=True)
            questions_details = json.loads(json.dumps(questions_details.data))

            for quest in questions_details:
                if quest["isOption"]:
                    options = optionsTable.objects.filter(
                        question_id=quest["id"])
                    options = OptionsSerializer(options, many=True)
                    quest["options"] = json.loads(json.dumps(options.data))
            item["form"] = questions_details
        result = {
            "data": form_details,
            "status": True,
            "message": "Data fetched !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def saveDepartmentCustomForms(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            post_data = post_data["newCustomForm"]
            isEdit = True if("id" in post_data) else False
            if (isEdit):
                feedback = custom_feedback.objects.get(
                    id=post_data["id"])

                feedback.delete()
            else:
                post_data["created_date"] = datetime.datetime.now()

            createRecordCustomForm = custom_feedback(
                department_id=department.objects.get(id=post_data["department_id"]), title=post_data["title"], created_date=post_data["created_date"] if post_data["created_date"] else None,
                expiry_date=post_data["expiry_date"], description=post_data["description"])
            # try:
            createRecordCustomForm.save()
            # except:
            feedback_id_latest = custom_feedback.objects.get(
                id=createRecordCustomForm.id)

            for item in post_data["form"]:
                createQuestion = question(
                    feedback_id=feedback_id_latest, isOption=item["isOption"], description=item["description"], question_type=question_answer_type.objects.get(id=item["question_type"]))
                createQuestion.save()
                if(item["isOption"]):
                    optionsTable.objects.bulk_create([optionsTable(question_id=question.objects.get(
                        id=createQuestion.id),
                        description=i["description"]) for i in item["options"]])

            result = {
                "status": True,
                "message": "Form edited successfully !" if(isEdit) else "New form created successfully !"

            }
            return HttpResponse(json.dumps(result), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
            return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def deleteCustomForm(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            print(post_data["id"])
            feedback = custom_feedback.objects.get(
                id=post_data["id"])

            feedback.delete()
            result = {
                "status": True,
                "message": "Form deleted successfully !"

            }
            return HttpResponse(json.dumps(result), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
            return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def saveNewVotingForms(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            post_data = post_data["votingForm"]
            # print(post_data)
            isEdit = True if("id" in post_data) else False
            if (isEdit):
                voting = votingFeedback.objects.get(
                    id=post_data["id"])

                voting.delete()
            else:
                post_data["created_date"] = datetime.datetime.now()
                post_data["like_count"] = 0
                post_data["dislike_count"] = 0

            customVotingForm = votingFeedback(
                department_id=department.objects.get(
                    id=post_data["department_id"]),
                title=post_data["title"],
                created_date=post_data["created_date"] if post_data["created_date"] else None,
                expiry_date=post_data["expiry_date"],
                description=post_data["description"],
                like_count=post_data["like_count"] if post_data["like_count"] else 0,
                dislike_count=post_data["dislike_count"] if post_data["dislike_count"] else 0,
            )
            # try:
            customVotingForm.save()
            result = {
                "status": True,
                "message": "Suggestion edited successfully !" if(isEdit) else "New suggestion created successfully !"

            }
            return HttpResponse(json.dumps(result), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
            return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def deleteVotingForm(request):

    if request.method == 'POST':
        try:
            post_data = JSONParser().parse(request)
            print(post_data["id"])
            feedback = votingFeedback.objects.get(
                id=post_data["id"])

            feedback.delete()
            result = {
                "status": True,
                "message": "Suggestion deleted successfully !"

            }
            return HttpResponse(json.dumps(result), content_type="application/json")
        except:
            result = {
                "status": False,
                "message": "Something went wrong ! Please check your inputs."
            }
            return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def getVotingForms(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        if(not post_data["isAdmin"]):
            form_details = votingFeedback.objects.filter(
                department_id=post_data['department']).order_by('created_date').exclude(is_published=False)
        else:
            form_details = votingFeedback.objects.filter(
                department_id=post_data['department']).order_by('created_date')
        form_details = VotingFeedbackSerializer(form_details, many=True)

        result = {
            "data": form_details.data,
            "status": True,
            "message": "Data fetched !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def updateVotingCount(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_data = post_data["data"]

        if(post_data["key"] == "like"):
            form_details = votingFeedback.objects.filter(
                id=post_data["id"]).update(like_count=post_data["count"])
        else:
            form_details = votingFeedback.objects.filter(
                id=post_data["id"]).update(dislike_count=post_data["count"])

        result = {
            "status": True,
            "message": "Your vote is recorded !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def publishForm(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_data = post_data["data"]

        if(post_data["key"] == "suggestion"):
            form_details = votingFeedback.objects.filter(
                id=post_data["id"]).update(is_published=True)
        else:
            form_details = custom_feedback.objects.filter(
                id=post_data["id"]).update(is_published=True)

        result = {
            "status": True,
            "message": "Your form is published. It is now visible to all members !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")


@csrf_exempt
def updateVotingCount(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_data = post_data["data"]

        if(post_data["key"] == "like"):
            form_details = votingFeedback.objects.filter(
                id=post_data["id"]).update(like_count=post_data["count"])
        else:
            form_details = votingFeedback.objects.filter(
                id=post_data["id"]).update(dislike_count=post_data["count"])

        result = {
            "status": True,
            "message": "Your vote is recorded !"

        }
        return HttpResponse(json.dumps(result), content_type="application/json")

@csrf_exempt
def insertBulkQuestionTypes(request):

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        question_answer_type.objects.bulk_create([question_answer_type(
            type=data["name"], question_type=data["question_type"], id=data["id"]) for data in post_data['question_answer_types']])
        return HttpResponse(json.dumps("Created all question types."), content_type="application/json")

@csrf_exempt
def getQuestionTypeList(request):

    if request.method == 'GET':
        response_data = question_answer_type.objects.values()
        response_data = QuestionTypeSerializer(response_data, many=True)
        return HttpResponse(json.dumps(response_data.data), content_type="application/json")