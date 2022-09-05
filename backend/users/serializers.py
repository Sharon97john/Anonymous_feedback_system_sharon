from rest_framework import serializers
from .models import users_table


class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = users_table
        fields = ('id',
                  'username',
                  'full_name',
                  'isAdmin',
                  'department_id')
