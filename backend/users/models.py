from django.db import models

# Create your models here.
class users_table(models.Model):
    full_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    isAdmin = models.BooleanField()
    department_id = models.ForeignKey(
        'department.department', on_delete=models.CASCADE)

    def __str__(self):
        return self.full_name