from django.contrib import admin
from .models import optionsTable, question_answer_type, question, general_feedback, custom_feedback, answer, votingFeedback

# Register your models here.
admin.site.register(question_answer_type)
admin.site.register(question)
admin.site.register(general_feedback)
admin.site.register(custom_feedback)
admin.site.register(answer)
admin.site.register(optionsTable)
admin.site.register(votingFeedback)