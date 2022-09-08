from nturl2path import url2pathname
from django.urls import URLPattern, path
from . import views

urlpatterns = [
    path('sendGeneralFeedback/', views.sendGeneralFeedback),
    path('getDepartmentCustomForms/', views.getDepartmentCustomForms),
    path('saveDepartmentCustomForms/', views.saveDepartmentCustomForms),
    path('saveNewVotingForms/', views.saveNewVotingForms),
    path('deleteCustomForm/', views.deleteCustomForm),
    path('deleteVotingForm/', views.deleteVotingForm),
    path('getVotingForms/', views.getVotingForms),
    path('updateVotingCount/', views.updateVotingCount),
    path('publishForm/', views.publishForm),
    path('saveCustomFeedbackAnswers/', views.saveCustomFeedbackAnswers),
    path('getAnalysis/', views.getAnalysis),
    path('getQuestionTypeList/', views.getQuestionTypeList),
    path('insertBulkQuestionTypes/', views.insertBulkQuestionTypes)
]
