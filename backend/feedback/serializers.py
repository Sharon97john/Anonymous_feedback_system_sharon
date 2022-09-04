from rest_framework import serializers
from feedback.models import general_feedback, custom_feedback, optionsTable, question, votingFeedback


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = general_feedback
        fields = ('id',
                  'department_id',
                  'description',
                  'user_id')


class CustomFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = custom_feedback
        fields = ('id',
                  'department_id',
                  'title',
                  'created_date',
                  'expiry_date',
                  'description',
                  'is_published')


class VotingFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = votingFeedback
        fields = ('id',
                  'department_id',
                  'title',
                  'created_date',
                  'expiry_date',
                  'description',
                  'like_count',
                  'dislike_count',
                  'is_published')


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = question
        fields = ('id',
                  'feedback_id',
                  'question_type',
                  'description',
                  'isOption'
                  )


class OptionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = optionsTable
        fields = ('id',
                  'question_id',
                  'description'
                  )
