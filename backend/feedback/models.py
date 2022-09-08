from django.db import models

# Create your models here.


class question_answer_type(models.Model):
    type = models.CharField(max_length=100)
    question_type = models.CharField(max_length=100)

    def __str__(self):
        return self.type


class general_feedback(models.Model):
    department_id = models.ForeignKey(
        'department.department', on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    user_id = models.ForeignKey('users.users_table', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


class custom_feedback(models.Model):
    title = models.CharField(default="XYZ", max_length=100)
    department_id = models.ForeignKey(
        'department.department', on_delete=models.CASCADE)
    created_date = models.DateTimeField()
    expiry_date = models.DateTimeField()
    description = models.CharField(max_length=200)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)


class question(models.Model):
    feedback_id = models.ForeignKey(
        'custom_feedback', on_delete=models.CASCADE)
    question_type = models.ForeignKey(
        'question_answer_type', on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    isOption = models.BooleanField()

    def __str__(self):
        return str(self.id)


class answer(models.Model):
    feedback_id = models.ForeignKey(
        'custom_feedback', on_delete=models.CASCADE)
    question_id = models.ForeignKey('question', on_delete=models.CASCADE)
    user_id = models.ForeignKey('users.users_table', on_delete=models.CASCADE)
    description = models.CharField(max_length=500)

    def __str__(self):
        return str(self.id)


class optionsTable(models.Model):
    question_id = models.ForeignKey('question', on_delete=models.CASCADE)
    description = models.CharField(max_length=500)

    def __str__(self):
        return str(self.id)


class votingFeedback(models.Model):
    title = models.CharField(default="XYZ", max_length=100)
    department_id = models.ForeignKey(
        'department.department', on_delete=models.CASCADE)
    created_date = models.DateTimeField()
    expiry_date = models.DateTimeField()
    description = models.CharField(max_length=500)
    like_count = models.IntegerField()
    dislike_count = models.IntegerField()
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)
