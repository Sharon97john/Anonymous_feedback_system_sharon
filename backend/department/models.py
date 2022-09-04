from django.db import models

# Create your models here.
class department_types(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)


class department(models.Model):
    department_name = models.CharField(max_length=100)
    number_of_students = models.IntegerField()
    department_type = models.ForeignKey(
        'department.department_types', on_delete=models.CASCADE)

    def __str__(self):
        return self.department_name


class department_head(models.Model):
    department_id = models.ForeignKey(
        'department.department', on_delete=models.CASCADE)
    user_id = models.ForeignKey('users.users_table', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)
