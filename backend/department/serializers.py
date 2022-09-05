from rest_framework import serializers
from department.models import department, department_head


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = department
        fields = ('id',
                  'department_name',
                  'number_of_students',
                  'department_type_id')


class DepartmentHeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = department_head
        fields = ('id',
                  'department_id',
                  'user_id')
