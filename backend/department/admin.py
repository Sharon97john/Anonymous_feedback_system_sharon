from django.contrib import admin
from .models import department, department_head, department_types

# Register your models here.
admin.site.register(department)
admin.site.register(department_head)
admin.site.register(department_types)
